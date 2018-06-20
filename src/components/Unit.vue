<template>
  <div
    class="unit"
    :class="{'is-selected': selected}"
    :style="extraStyle"
    @click="onClick"
  >
    <img src="/static/unit.png">
  </div>
</template>

<script>
export default {
  name: 'Unit',

  components: {
  },

  props: {
    selected: Boolean,
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
        top: (this.y * 30).toString() + 'px',
        left: (this.x * 30).toString() + 'px'
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

  &.is-selected
    animation: blinker .4s cubic-bezier(.5, 0, 1, 1) infinite alternate

  @keyframes blinker
    to
      opacity: 0
      // visibility: hidden
</style>
