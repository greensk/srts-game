<template>
  <div class="base-timer"></div>
</template>

<script>
export default {
  props: {
    timeout: {
      type: Number
    },
    enabled: {
      type: Boolean,
      default: true
    },
    // suppress events without stopping the timer
    suppress: {
      type: Boolean,
      default: false
    },
    immediate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      intervalId: null
    }
  },
  mounted () {
    if (this.enabled) {
      this.on()
    }
  },
  activated () {
    if (this.enabled) {
      this.on()
    }
  },
  deactivated () {
    this.off()
  },
  destroyed () {
    this.off()
  },
  watch: {
    enabled (value) {
      if (value) {
        this.on()
      } else {
        this.off()
      }
    }
  },
  methods: {
    on () {
      if (!this.intervalId) {
        this.intervalId = setInterval(this.timer, this.timeout)
        if (this.immediate) {
          this.timer()
        }
      }
    },
    off () {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    timer () {
      if (!this.suppress) {
        this.$emit('timer')
      }
    }
  }
}
</script>
