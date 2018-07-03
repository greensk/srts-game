<template>
  <div class="start-game">
    <start-game-waiting
      v-if="gameToJoin"
    ></start-game-waiting>
    <start-game-created
      v-else-if="ownGame"
      :game-requests="gameRequests"
      @start-game="$emit('start-game', arguments[0])"
    ></start-game-created>
    <template v-else>
      <start-game-create
        @create="$emit('create')"
      ></start-game-create>
      <start-game-join
        :games="games"
        @join="$emit('join', arguments[0])"
      ></start-game-join>
    </template>
  </div>
</template>

<script>
import StartGameWaiting from './StartGameWaiting.vue'
import StartGameCreate from './StartGameCreate.vue'
import StartGameCreated from './StartGameCreated.vue'
import StartGameJoin from './StartGameJoin.vue'

export default {
  name: 'StartGame',

  components: {
    StartGameWaiting,
    StartGameCreate,
    StartGameCreated,
    StartGameJoin
  },

  props: {
    gameToJoin: String,
    gameRequests: Array,
    ownGame: Boolean,
    games: [Array, Object]
  },

  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
  }
}
</script>

<style lang="sass" scoped>
.start-game
</style>
