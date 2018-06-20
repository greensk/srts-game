import defaultState from './defaultState.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

export default {
  state: defaultState(),
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
}
