import {
  SET_STATUS
} from './mutationTypes.js'

const url = 'ws://localhost:1337'

export default store => {
  init(store, new WebSocket(url))
}

function init (store, socket) {
  store.subscribeAction((action, store) => {
    if (socket.readyState !== 1) {
      console.log('INVALID SOCKET')
      return
    }
    if (!action.payload || (!action.payload.external && !action.payload.priv)) {
      socket.send(JSON.stringify(action))
    }
  })
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    const payload = message.payload || {}
    payload.external = true
    if (message.type) {
      store.dispatch(message.type, payload)
    }
  }
  socket.onopen = (event) => {
    store.commit(SET_STATUS, store.state.gameId ? 'play' : 'wait')
  }
  socket.onclose = (event) => {
    store.commit(SET_STATUS, 'connectionError')
    setTimeout(() => {
      const newSocket = new WebSocket(url)
      init(store, newSocket)
      store.dispatch(
        'resumeGame',
        {
          gameId: store.state.gameId,
          player: store.state.currentPlayer
        }
      )
    }, 2000)
  }
}
