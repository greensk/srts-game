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
  REGENERATION
} from './mutationTypes.js'
import _ from 'lodash'
export default {
  [SELECT_UNIT] (state, unitId) {
    state.selectedUnitId = unitId
  },
  [UPDATE_UNIT] (state, { unitId, unitData }) {
    state.units = state.units.map((unit) => {
      if (unit.id === unitId) {
        return {...unit, ...unitData}
      } else {
        return unit
      }
    })
  },
  [UNITS_TIMEOUT_UPDATE] (state) {
    state.units = state.units.map((unit) => {
      let currentEnergy = unit.currentEnergy
      if (currentEnergy < unit.requiredEnergy) {
        currentEnergy += state.energyTimeoutDelta
      }
      let currentHealth = unit.currentHealth + state.healthTimeoutDelta
      // TODO check death
      return {
        ...unit,
        currentEnergy,
        currentHealth
      }
    })
  },
  [SET_PLAYER_NAME] (state, value) {
    state.playerName = value
  },
  [SET_OWN_GAME] (state, value) {
    state.ownGame = value
  },
  [SET_GAMES] (state, values) {
    state.games = values
  },
  [SET_GAME_TO_JOIN] (state, value) {
    state.gameToJoin = value
  },
  [SET_GAME_REQUESTS] (state, values) {
    state.gameRequests = values
  },
  [SET_STATUS] (state, value) {
    state.status = value
  },
  [SET_CURRENY_PLAYER] (state, value) {
    state.currentPlayer = value
  },
  [SET_GAME_ID] (state, gameId) {
    state.gameId = gameId
  },
  [REGENERATION] (state) {
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
    state.fields = state.fields.map((field) => {
      const near = getNearFields(field.x, field.y)
      const nearType = _.sample(near.filter(f => f.type > 0).map(f => f.type))
      if (nearType && Math.random() < 0.01) {
        return {...field, type: nearType}
      } else {
        return field
      }
    })
  }
}
