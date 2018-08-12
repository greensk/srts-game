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
  unitsTimeoutUpdate ({ commit, state, dispatch }) {
    let values = {}
    state.units.forEach((unit) => {
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
    // magic action, server should start game with specified client
    if (gameId) {
      commit(SET_GAME_ID, gameId)
    }
    commit(SET_STATUS, 'play')
    if (player) {
      commit(SET_CURRENY_PLAYER, +player)
    }
    dispatch('generateMap', {})
  },
  setGameId ({ commit }, { gameId }) {
    commit(SET_GAME_ID, gameId)
  },
  resumeGame ({ commit, state }, { gameId, player }) {
    // magic action to provide to the restarted server current game id and player
    commit(SET_STATUS, 'play')
  },
  regeneration ({ commit, state, dispatch }, params = {}) {
    if (state.currentPlayer !== 0) {
      return
    }
    const getNearFields = (x, y) => {
      let result = []
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          if ((dx !== 0 || dy !== 0) && (dx === 0 || dy === 0)) {
            const field = state.fields.find(f => f.x === x + dx && f.y === y + dy)
            if (field) {
              result.push(field)
            }
          }
        }
      }
      return result
    }
    dispatch(
      'setFields',
      {
        fields: state.fields.map(
          (field) => {
            if (field.type === 2) {
              return null
            }
            const near = getNearFields(field.x, field.y)
            const nearType = _.sample(near.filter(f => f.type > -1).map(f => f.type))
            if (nearType > -1 && Math.random() < 0.03) {
              return {...field, type: nearType}
            } else {
              return null
            }
          }
        ).filter(f => f !== null)
      }
    )
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
