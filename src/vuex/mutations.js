import {
  SELECT_UNIT,
  UPDATE_UNIT,
  UNITS_ENERGY_UPDATE,
  SET_PLAYER_NAME,
  SET_OWN_GAME,
  SET_GAMES,
  SET_GAME_TO_JOIN,
  SET_GAME_REQUESTS,
  SET_STATUS,
  SET_CURRENY_PLAYER,
  SET_GAME_ID
} from './mutationTypes.js'

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
  [UNITS_ENERGY_UPDATE] (state) {
    state.units = state.units.map((unit) => {
      if (unit.currentEnergy < unit.requiredEnergy) {
        return {...unit, currentEnergy: unit.currentEnergy + 1}
      } else {
        return unit
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
  }
}
