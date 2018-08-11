<template>
  <div
    class="unit"
    :class="[status]"
    :style="extraStyle"
    @click="onClick"
  >
    <div
      class="energy-idicator"
    >
      <div
        v-if="currentEnergy > 0"
        class="energy-indicator-value"
        :style="energyIndicatorValueStyle"
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
    x: Number,
    y: Number,
    player: Number
  },

  data () {
    return {
    }
  },

  computed: {
    extraStyle () {
      return {
        top: (this.y * fieldWidth).toString() + 'px',
        left: (this.x * fieldHeight).toString() + 'px'
      }
    },
    energyIndicatorValueStyle () {
      return {
        'width': Math.floor(fieldWidth * (this.currentEnergy - 1) / (this.requiredEnergy - 1)) + 'px'
      }
    },
    healthIndicatorValueStyle () {
      return {
        'width': Math.floor(fieldWidth * (this.currentEnergy - 1) / (this.requiredEnergy - 1)) + 'px'
      }
    },
    unitImageUrl () {
      return `/static/unit${this.player}.png`
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

  .energy-idicator
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 3px
    background-color: gray

  .energy-indicator-value
    position: absolute
    top: 0px
    left: 0px
    height: 3px
    background-color: blue
    transition: width 1s linear

  &.selected
    animation: blinker .4s cubic-bezier(.5, 0, 1, 1) infinite alternate

  &.waiting
    opacity: 0.7

  &.selectable
    cursor: pointer

  @keyframes blinker
    to
      opacity: 0
      // visibility: hidden
</style>
