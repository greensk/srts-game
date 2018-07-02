import {
  SELECT_UNIT,
  UPDATE_UNIT,
  UNITS_ENERGY_UPDATE,
  SET_PLAYER_NAME,
  SET_OWN_GAME,
  SET_GAMES
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
  }
}
