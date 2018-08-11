<template>
  <div
    class="field"
    :class="[status, typeClass]"
    :style="extraStyle"
    @click="onClick"
  ></div>
</template>

<script>
import { fieldWidth, fieldHeight } from '@/shared/constants.js'
export default {
  name: 'Field',

  components: {
  },

  props: {
    x: Number,
    y: Number,
    status: String,
    type: Number
  },

  data () {
    return {}
  },

  computed: {
    extraStyle () {
      return {
        top: (this.y * fieldWidth).toString() + 'px',
        left: (this.x * fieldHeight).toString() + 'px'
      }
    },
    typeClass () {
      return `type-${this.type}`
    }
  },

  methods: {
    onClick () {
      if (this.status === 'reachable') {
        this.$emit('go')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.field
  border: 1px dotted gray
  position: absolute
  display: block
  width: 40px
  height: 40px
  background-color: green

  &.unreachable
    background-color: gray
  &.reachable
    cursor: pointer

  &.type-0
    background-color: red

  &.type-1
    background-color: blue

  &.type-2
    background-color: yellow
</style>
