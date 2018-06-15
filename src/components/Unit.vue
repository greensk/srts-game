<template>
  <div
    class="unit"
    :style="extraStyle"
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
  }
}
</script>

<style lang="sass" scoped>
.unit
  position: absolute
  cursor: pointer
</style>
