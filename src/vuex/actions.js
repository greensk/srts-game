import {
  SELECT_UNIT,
  UPDATE_UNIT,
  UNITS_ENERGY_UPDATE,
  SET_PLAYER_NAME,
  SET_OWN_GAME,
  SET_GAMES
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
  },
  setPlayerName ({ commit }, { name }) {
    // magic action, server should update player name at the list
    commit(SET_PLAYER_NAME, name)
  },
  createGame ({ commit }) {
    // magic action, server should create a game
    commit(SET_OWN_GAME, true)
  },
  setGamesList ({ commit }, { games }) {
    // called by server on games list update when clien status is "wait"
    console.log(games)
    commit(SET_GAMES, games)
  }
}
