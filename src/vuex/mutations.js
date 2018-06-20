import {
  SELECT_UNIT
} from './mutationTypes.js'

export default {
  [SELECT_UNIT] (state, unitId) {
    state.selectedUnit = unitId
  }
}
