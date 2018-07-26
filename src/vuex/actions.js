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
  SET_CURRENY_PLAYER
} from './mutationTypes.js'
export default {
  selectUnit ({ commit }, { unit, priv = true }) {
    commit(SELECT_UNIT, unit.id)
  },
  goToField ({ commit, state }, { unitId, field }) {
    commit(
      UPDATE_UNIT,
      { unitId, unitData: { x: field.x, y: field.y, currentEnergy: 0 } }
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
  },
  joinGame ({ commit }, { game }) {
    // magic action, server should send accept message to a partner
    commit(SET_GAME_TO_JOIN, game)
  },
  setGameRequests ({ commit }, { list }) {
    // called by server when some user tries to join a game you own
    commit(SET_GAME_REQUESTS, list)
  },
  startGame ({ commit }, { clientId, player }) {
    // magic action, server should start game with specified client
    commit(SET_STATUS, 'play')
    if (player) {
      commit(SET_CURRENY_PLAYER, +player)
    }
  }
}
