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

  &.unreachable:before
    content: ' '
    position: absolute
    top: 0px
    left: 0px
    width: 40px
    height: 40px
    background-color: rgba(10, 10, 10, 0.2)
  &.reachable
    cursor: pointer

  background-image: url(/static/field-1.png)

  &.type-0:after
    position: absolute
    content: ''
    left: 0px
    top: 0px
    height: 40px
    width: 40px
    background-repeat: no-repeat
    background-image: url(/static/field0.png)
    margin-top: 5px
    margin-left: 5px

  &.type-1:after
    position: absolute
    content: ''
    left: 0px
    top: 0px
    height: 40px
    width: 40px
    background-repeat: no-repeat
    background-image: url(/static/field1.png)
    margin-top: 5px
    margin-left: 5px

  &.type-2:after
    position: absolute
    content: ''
    left: 0px
    top: 0px
    height: 40px
    width: 40px
    background-repeat: no-repeat
    background-image: url(/static/field2.png)
    margin-top: 5px
    margin-left: 5px

  &.type-3:after
    position: absolute
    content: ''
    left: 0px
    top: 0px
    height: 40px
    width: 40px
    background-repeat: no-repeat
    background-image: url(/static/field3.png)
    margin-top: 5px
    margin-left: 5px
</style>
