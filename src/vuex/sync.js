import {
  SET_STATUS
} from './mutationTypes.js'

const socket = new WebSocket('ws://localhost:1337')

export default store => {
  store.subscribeAction((action, store) => {
    if (!action.payload || (!action.payload.external && !action.payload.private)) {
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
    store.commit(SET_STATUS, 'wait')
  }
  socket.onerror = (event) => {
    store.commit(SET_STATUS, 'connectionError')
  }
}
