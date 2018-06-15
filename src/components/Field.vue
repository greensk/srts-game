<template>
  <div
    class="field"
    :style="extraStyle"
  ></div>
</template>

<script>
export default {
  name: 'Field',

  components: {
  },

  props: {
    x: Number,
    y: Number
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
</style>
