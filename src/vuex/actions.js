import {
  SELECT_UNIT,
  UPDATE_UNIT
} from './mutationTypes.js'
export default {
  selectUnit ({ commit }, unit) {
    commit(SELECT_UNIT, unit.id)
  },
  goToField ({ commit, state }, field) {
    commit(
      UPDATE_UNIT,
      { unitId: state.selectedUnitId, unitData: { x: field.x, y: field.y } }
    )
  }
}
