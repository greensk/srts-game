<template>
  <div id="app">
    <div>
      <game-map></game-map>
    </div>
  </div>
</template>

<script>
import GameMap from '@/components/GameMap.vue'
export default {
  name: 'App',
  components: {
    GameMap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
