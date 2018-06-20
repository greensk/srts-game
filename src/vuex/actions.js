import {
  SELECT_UNIT
} from './mutationTypes.js'
export default {
  selectUnit ({ commit }, unit) {
    commit(SELECT_UNIT, unit.id)
  }
}
