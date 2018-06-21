<template>
  <div
    class="field"
    :class="[status]"
    :style="extraStyle"
    @click="onClick"
  ></div>
</template>

<script>
export default {
  name: 'Field',

  components: {
  },

  props: {
    x: Number,
    y: Number,
    status: String
  },

  data () {
    return {}
  },

  computed: {
    extraStyle () {
      return {
        top: ((this.y - 1) * 30).toString() + 'px',
        left: ((this.x - 1) * 30).toString() + 'px'
      }
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
</style>
