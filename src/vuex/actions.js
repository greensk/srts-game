import {
  SELECT_UNIT,
  UPDATE_UNIT,
  // UNITS_TIMEOUT_UPDATE,
  SET_PLAYER_NAME,
  SET_OWN_GAME,
  SET_GAMES,
  SET_GAME_TO_JOIN,
  SET_GAME_REQUESTS,
  SET_STATUS,
  SET_CURRENY_PLAYER,
  SET_GAME_ID,
  SET_FIELDS,
  UNITS_UPDATE
} from './mutationTypes.js'
import _ from 'lodash'
export default {
  selectUnit ({ commit }, { unit, priv = true }) {
    commit(SELECT_UNIT, unit.id)
  },
  goToField ({ commit, state }, { unitId, field }) {
    const unit = state.units.find(u => u.id === unitId)
    if (unit.currentEnergy < unit.requiredEnergy) {
      return
    }
    let currentHealth = unit.currentHealth
    if (field.type === unit.player) {
      currentHealth += state.healthValidFoodDelta
    } else if (field.type === 2) {
      currentHealth += state.healthGrassFoodDelta
    } else if (field.type === 3) {
      currentHealth += state.healthCactusFoodDelta
    } else if (field.type > -1) {
      currentHealth += state.healthInvalidFoodDelta
    }
    commit(
      UPDATE_UNIT,
      { unitId, unitData: { x: field.x, y: field.y, currentEnergy: 0, currentHealth } }
    )
    const newFields = state.fields.map((f) => {
      if (f.x === field.x && f.y === field.y) {
        return {
          ...f,
          type: -1
        }
      } else {
        return f
      }
    })
    commit(SET_FIELDS, newFields)
  },
  unitsTimeoutUpdate ({ commit, state, dispatch }, params) {
    let values = {}
    state.units.forEach((unit) => {
      if (unit.currentHealth < 0) {
        return
      }
      values[unit.id] = {
        currentHealth: unit.currentHealth + state.healthTimeoutDelta
      }
      if (unit.currentEnergy < unit.requiredEnergy) {
        values[unit.id].currentEnergy = unit.currentEnergy + state.energyTimeoutDelta
      }
    })
    // commit(UNITS_TIMEOUT_UPDATE, values)
    dispatch('unitsUpdate', { values })
  },
  unitsUpdate ({ commit }, { values }) {
    commit(UNITS_UPDATE, values)
  },
  setPlayerName ({ commit }, { name }) {
    // magic action, server should update player name at the list
    commit(SET_PLAYER_NAME, name)
  },
  createGame ({ commit }) {
    // magic action, server should create a game
    commit(SET_OWN_GAME, true)
  },
  setGamesList ({ commit }, { games }) {
    // called by server on games list update when clien status is "wait"
    console.log(games)
    commit(SET_GAMES, games)
  },
  joinGame ({ commit }, { game }) {
    // magic action, server should send accept message to a partner
    commit(SET_GAME_TO_JOIN, game)
  },
  setGameRequests ({ commit }, { list }) {
    // called by server when some user tries to join a game you own
    commit(SET_GAME_REQUESTS, list)
  },
  startGame ({ commit, dispatch }, { clientId, player, gameId }) {
    console.log('START GAME')
    // magic action, server should start game with specified client
    if (gameId) {
      commit(SET_GAME_ID, gameId)
    }
    if (player) {
      commit(SET_CURRENY_PLAYER, +player)
    } else {
      dispatch('generateMap', {})
    }
    commit(SET_STATUS, 'play')
  },
  setGameId ({ commit }, { gameId }) {
    commit(SET_GAME_ID, gameId)
  },
  resumeGame ({ commit, state }, { gameId, player }) {
    console.log('RESUME GAME')
    // magic action to provide to the restarted server current game id and player
    commit(SET_STATUS, 'play')
  },
  regeneration ({ commit, state, dispatch }, params = {}) {
    console.log('REGENERATION')
    if (state.currentPlayer !== 0) {
      return
    }

    const normalizeMap = (fields) => {
      let result = _.map(Array(state.mapWidth * state.mapHeight), (val, index) => {
        const x = index % state.mapWidth
        const y = Math.floor(index / state.mapWidth)

        return {
          x,
          y,
          type: -1,
          id: `${x}:${y}`
        }
      })

      _.forEach(fields, ({x, y, type}) => {
        result[x + y * state.mapWidth].type = type
      })

      return result
    }

    const fields = normalizeMap(state.fields)

    const index = (x, y) => (x < 0 || y < 0 || x >= state.mapWidth || y >= state.mapHeight) ? -1 : x + y * state.mapWidth
    const type = (x, y) => index(x, y) >= 0 ? fields[index(x, y)].type : -1

    let bananas = _.filter(fields, ({type}) => type === 0).length
    let carrots = _.filter(fields, ({type}) => type === 1).length

    const newFields = normalizeMap(state.fields)

    for (let x = 0, y = 0; y < state.mapHeight; x < state.mapWidth - 1 ? x++ : (++y && (x = 0))) {
      const ind = index(x, y)
      const neighbours = [type(x - 1, y), type(x + 1, y), type(x, y - 1), type(x, y + 1)]
      let current = type(x, y)

      const prob = Math.random()
      const bananaProb = neighbours.filter((n) => n === 0).length * state.growProbability.banana
      const carrotProb = neighbours.filter((n) => n === 1).length * state.growProbability.carrot
      const grassProb = neighbours.filter((n) => n === 2).length * state.growProbability.grass
      const cactusProb = neighbours.filter((n) => n === 3).length * state.growProbability.cactus

      if (current === -1) {
        let growBanana = (bananaProb > prob) && (bananas <= carrots || !state.simGrow)
        let growCarrot = (carrotProb > prob) && (bananas >= carrots || !state.simGrow)

        if (growBanana && growCarrot) {
          if (Math.random() < 0.5) {
            growBanana = false
          } else {
            growCarrot = false
          }
        }

        if (growBanana) {
          current = newFields[ind].type = 0
        }

        if (growCarrot) {
          current = newFields[ind].type = 1
        }
      }

      const allNeightbours = (x > 0) + (x < state.mapWidth - 1) + (y > 0) + (y < state.mapHeight - 1)
      const growGrass = (grassProb > prob) || (state.mutation && neighbours.filter((n) => n >= 0).length >= allNeightbours)

      if (growGrass && current !== 3) {
        current = newFields[ind].type = 2
      }

      if (cactusProb > prob) {
        current = newFields[ind].type = 3
      }

      if (type(x, y) === -1 && current === 0) {
        bananas++
      }

      if (type(x, y) === -1 && current === 1) {
        carrots++
      }

      if (type(x, y) === 0 && current !== 0) {
        bananas--
      }

      if (type(x, y) === 1 && current !== 1) {
        carrots--
      }
    }

    dispatch('setFields', {fields: newFields})
  },
  setFields ({ commit, state }, { fields }) {
    if (state.fields.length === 0) {
      commit(SET_FIELDS, fields)
      return
    }
    commit(SET_FIELDS, state.fields.map((cf) => {
      const replaceField = fields.find(f => f.x === cf.x && f.y === cf.y)
      if (replaceField) {
        return replaceField
      } else {
        return cf
      }
    }))
  },
  generateMap ({ commit, state, dispatch }, { external }) {
    if (state.currentPlayer !== 0) {
      return
    }
    let fields = []
    for (let x = 0; x < state.mapWidth; x++) {
      for (let y = 0; y < state.mapHeight; y++) {
        const rand = Math.random()
        if (rand < 0.02) {
          var type = 0
        } else if (rand < 0.04) {
          type = 1
        } else if (rand < 0.2) {
          type = 2
        } else if (rand < 0.21) {
          type = 3
        } else {
          type = -1
        }
        fields.push({ x, y, id: `${x}:${y}`, type })
      }
    }
    dispatch('setFields', { fields })
  }
}
