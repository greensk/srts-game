<template>
  <div class="start-game-created">
    <div
      v-for="request in gameRequests"
      :key="request.id"
      @click="$emit('start-game', request.id)"
    >
      {{ request.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartGameCreated',

  components: {
  },

  props: {
    gameRequests: Array
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
.start-game-created
</style>
