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
export default {
  [SELECT_UNIT] (state, unitId) {
    state.selectedUnitId = unitId
  },
  [SET_FIELDS] (state, fields) {
    state.fields = fields
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
  }
}
