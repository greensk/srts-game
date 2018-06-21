import {
  SELECT_UNIT,
  UPDATE_UNIT,
  UNITS_ENERGY_UPDATE
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
  }
}
