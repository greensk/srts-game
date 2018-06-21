<template>
  <div
    class="unit"
    :class="{'is-selected': selected}"
    :style="extraStyle"
    @click="onClick"
  >
    <div
      class="energy-idicator"
    >
      <div
        class="energy-indicator-value"
        :style="energyIndicatorValueStyle"
      ></div>
    </div>
    <img src="/static/unit.png">
  </div>
</template>

<script>
import { fieldWidth, fieldHeight } from '@/shared/constants.js'
export default {
  name: 'Unit',

  components: {
  },

  props: {
    selected: Boolean,
    currentEnergy: Number,
    requiredEnergy: Number,
    x: Number,
    y: Number
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
        'width': Math.floor(fieldWidth * this.currentEnergy / this.requiredEnergy) + 'px'
      }
    }
  },

  methods: {
    onClick () {
      this.$emit('select')
    }
  }
}
</script>

<style lang="sass" scoped>
.unit
  position: absolute
  cursor: pointer

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
    transition: width 1s

  &.is-selected
    animation: blinker .4s cubic-bezier(.5, 0, 1, 1) infinite alternate

  @keyframes blinker
    to
      opacity: 0
      // visibility: hidden
</style>
