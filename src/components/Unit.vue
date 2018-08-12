<template>
  <div
    class="unit"
    :class="[status, {'is-movable': movable}]"
    :style="extraStyle"
    @click="onClick"
  >
    <div
      class="health-idicator"
    >
      <div
        class="health-indicator-value"
        :style="healthIndicatorValueStyle"
      ></div>
    </div>
    <img :src="unitImageUrl">
  </div>
</template>

<script>
import { fieldWidth, fieldHeight } from '@/shared/constants.js'
export default {
  name: 'Unit',

  components: {
  },

  props: {
    status: String,
    currentEnergy: Number,
    requiredEnergy: Number,
    currentHealth: Number,
    requiredHealth: Number,
    maxHealth: Number,
    x: Number,
    y: Number,
    player: Number
  },

  data () {
    return {
    }
  },

  computed: {
    movable () {
      return this.currentEnergy >= this.requiredEnergy
    },
    extraStyle () {
      return {
        top: (this.y * fieldWidth).toString() + 'px',
        left: (this.x * fieldHeight).toString() + 'px',
        opacity: this.currentEnergy < this.requiredEnergy ? 0.4 : 1
      }
    },
    healthIndicatorValueStyle () {
      let current = this.currentHealth
      if (current > this.maxHealth) {
        current = this.maxHealth
      }
      return {
        'width': Math.floor(fieldWidth * (current - 1) / (this.maxHealth - 1)) + 'px',
        'background-color': this.currentHealth > this.maxHealth ? 'red' : 'blue'
      }
    },
    unitImageUrl () {
      if (this.currentHealth < 0) {
        return `/static/grave.png`
      } else {
        return `/static/unit${this.player}.png`
      }
    }
  },

  methods: {
    onClick () {
      if (this.status === 'selectable') {
        this.$emit('select')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.unit
  position: absolute

  img
    margin: 5px

  .health-idicator
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 3px
    background-color: gray

  .health-indicator-value
    position: absolute
    top: 0px
    left: 0px
    height: 3px
    background-color: blue
    transition: width 1s linear

  &.selected.is-movable
    // animation: blinker .4s cubic-bezier(.5, 0, 1, 1) infinite alternate

  &.waiting
    opacity: 0.7

  &.selectable
    cursor: pointer

  @keyframes blinker
    to
      opacity: 0
      // visibility: hidden
</style>
