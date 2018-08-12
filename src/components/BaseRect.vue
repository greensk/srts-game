<template>
  <div
    class="base-rect"
    :style="extraStyle"
  >
    <div
      class="inner"
      :style="innerStyle"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'BaseRect',

  components: {
  },

  props: {
    width: Number,
    height: Number,
    value: Number,
    color: String
  },

  data () {
    return {
    }
  },

  computed: {
    extraStyle () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    innerStyle () {
      return {
        'background-color': this.color,
        width: Math.ceil(this.width * this.actualValue) + 'px'
      }
    },
    actualValue () {
      if (this.value > 1) {
        return 1
      } else {
        return this.value
      }
    }
  },

  methods: {
  }
}
</script>

<style lang="sass" scoped>
.base-rect
  border: 1px solid gray

.inner
  height: 100%
</style>
