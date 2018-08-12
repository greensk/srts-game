<template>
  <div id="app">
    <div class="app-wrapper">
      <div v-if="status === 'connection'">Соединение с сервером</div>
      <div v-if="status === 'connectionError'">Ошибка соединения с сервером</div>
      <status-panel-container v-if="status === 'play'"></status-panel-container>
      <start-container v-if="status === 'wait'"></start-container>
      <game-container v-if="status === 'play'"></game-container>
    </div>
  </div>
</template>

<script>
import StartContainer from '@/components/StartContainer.vue'
import GameContainer from '@/components/GameContainer.vue'
import StatusPanelContainer from '@/components/StatusPanelContainer.vue'

import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    StartContainer,
    GameContainer,
    StatusPanelContainer
  },
  data () {
    return {
      socket: null
    }
  },
  computed: {
    ...mapState({
      status: state => state.status
    })
  }
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

body
  background-color: #D2D2D2
</style>
