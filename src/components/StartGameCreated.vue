<template>
  <div class="start-game-created">
    <div v-if="gameRequests.length > 0">Щелкните на имя игрока, чтобы начать</div>
    <div v-else>Ожидание подключений</div>
    <div
      v-for="request in gameRequests"
      :key="request.id"
      class="request-item"
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

.request-item
  cursor: pointer
</style>
