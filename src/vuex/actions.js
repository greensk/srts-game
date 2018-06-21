import {
  SELECT_UNIT,
  UPDATE_UNIT,
  UNITS_ENERGY_UPDATE
} from './mutationTypes.js'
export default {
  selectUnit ({ commit }, unit) {
    commit(SELECT_UNIT, unit.id)
  },
  goToField ({ commit, state }, field) {
    commit(
      UPDATE_UNIT,
      { unitId: state.selectedUnitId, unitData: { x: field.x, y: field.y, currentEnergy: 0 } }
    )
    commit(SELECT_UNIT, null)
  },
  unitsEnergyUpdate ({ commit }) {
    commit(UNITS_ENERGY_UPDATE)
  }
}
