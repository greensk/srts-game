<template>
  <div class="status-panel">
    <div>Мое здоровье: {{ myHealth }}</div>
    <div>Моя энергия: {{ myEnergy }}</div>
    <div>Здоровье соперника: {{ enemyEnergy }}</div>
    <div>Энергия соперника: {{ enemyHealth }}</div>
  </div>
</template>

<script>
export default {
  name: 'StatusPanel',

  components: {
  },

  props: {
    myEnergy: Number,
    myHealth: Number,
    enemyEnergy: Number,
    enemyHealth: Number
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
.status-panel
  position: absolute
  left: 0px
  bottom: 0px
</style>
