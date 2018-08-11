import {
  SELECT_UNIT,
  UPDATE_UNIT,
  UNITS_TIMEOUT_UPDATE,
  SET_PLAYER_NAME,
  SET_OWN_GAME,
  SET_GAMES,
  SET_GAME_TO_JOIN,
  SET_GAME_REQUESTS,
  SET_STATUS,
  SET_CURRENY_PLAYER,
  SET_GAME_ID,
  SET_FIELDS
} from './mutationTypes.js'
import _ from 'lodash'
export default {
  selectUnit ({ commit }, { unit, priv = true }) {
    commit(SELECT_UNIT, unit.id)
  },
  goToField ({ commit, state }, { unitId, field }) {
    const unit = state.units.find(u => u.id === unitId)
    let currentHealth = unit.currentHealth
    if (field.type === state.currentPlayer) {
      currentHealth += state.healthValidFoodDelta
    } else if (field.type > -1) {
      currentHealth += state.healthInvalidFoodDelta
    }
    commit(
      UPDATE_UNIT,
      { unitId, unitData: { x: field.x, y: field.y, currentEnergy: 0, currentHealth } }
    )
    const newFields = state.fields.map((f) => {
      if (f === field) {
        return {
          ...f,
          type: -1
        }
      } else {
        return f
      }
    })
    commit(SET_FIELDS, newFields)
    commit(SELECT_UNIT, null)
  },
  unitsTimeoutUpdate ({ commit }) {
    commit(UNITS_TIMEOUT_UPDATE)
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
  startGame ({ commit }, { clientId, player, gameId }) {
    // magic action, server should start game with specified client
    if (gameId) {
      commit(SET_GAME_ID, gameId)
    }
    commit(SET_STATUS, 'play')
    if (player) {
      commit(SET_CURRENY_PLAYER, +player)
    }
  },
  setGameId ({ commit }, { gameId }) {
    commit(SET_GAME_ID, gameId)
  },
  resumeGame ({ commit, state }, { gameId, player }) {
    // magic action to provide to the restarted server current game id and player
    commit(SET_STATUS, 'play')
  },
  regeneration ({ commit, state, dispatch }) {
    if (state.currentPlayer !== 0) {
      return
    }
    const getNearFields = (x, y) => {
      let result = []
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          if (dx !== 0 && dy !== 0) {
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
            const near = getNearFields(field.x, field.y)
            const nearType = _.sample(near.filter(f => f.type > -1).map(f => f.type))
            if (nearType && Math.random() < 0.01) {
              return {...field, type: nearType}
            } else {
              return field
            }
          }
        )
      }
    )
  },
  setFields ({ commit }, { fields }) {
    commit(SET_FIELDS, fields)
  }
}
