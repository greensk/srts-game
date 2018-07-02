<template>
  <div class="start-game">
    <start-game-create
      v-if="!ownGame"
      @create="$emit('create')"
    ></start-game-create>
    <start-game-created
      v-if="ownGame"
    ></start-game-created>
    <start-game-join
      v-if="!ownGame"
      :games="games"
    ></start-game-join>
  </div>
</template>

<script>
import StartGameCreate from './StartGameCreate.vue'
import StartGameCreated from './StartGameCreated.vue'
import StartGameJoin from './StartGameJoin.vue'

export default {
  name: 'StartGame',

  components: {
    StartGameCreate,
    StartGameCreated,
    StartGameJoin
  },

  props: {
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
