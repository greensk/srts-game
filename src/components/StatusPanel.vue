<template>
  <div class="status-panel">
    <div class="content">
      <img src="/static/unit0.png">
      <base-rect
        :width="120"
        :height="30"
        :value="myHealth / maxHealth"
        :color="myHealth < maxHealth ? 'blue' : 'green'"
      ></base-rect>
      <div class="separator"></div>
      <base-rect
        :width="120"
        :height="30"
        :value="enemyHealth / maxHealth"
        :color="enemyHealth < maxHealth ? 'blue' : 'green'"
      ></base-rect>
      <img src="/static/unit1.png">
    </div>
  </div>
</template>

<script>
import BaseRect from './BaseRect.vue'
export default {
  name: 'StatusPanel',

  components: {
    BaseRect
  },

  props: {
    myEnergy: Number,
    myHealth: Number,
    enemyEnergy: Number,
    enemyHealth: Number,
    maxHealth: Number
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
  width: 100%
  height: 80px

.content
  max-width: 800px
  margin: 0px auto

  display: flex
  height: 100%
  align-items: center

.item:first-child
  text-align: left

.item:first-child:last-child
  text-align: right

.separator
  flex-grow: 1
</style>
