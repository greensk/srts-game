<template>
  <div
    v-if="games"
    class="start-game-join"
  >
    <div v-if="games.length > 0">{{ $t('start.select') }}</div>
    <div
      v-for="game in games"
      :key="game.id"
      class="game-item"
      @click="$emit('join', game.id)"
    >
      {{ game.name }} ({{game.id}})
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartGameJoin',

  components: {
  },

  props: {
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
.start-game-join
  margin-top: 30px
.game-item
  cursor: pointer
</style>
