<template>
  <div class="start-layout">
    <img src="/static/rules.png">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartLayout',

  components: {
  },

  props: {
  },

  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
  }
}
</script>

<style lang="sass" scoped>
.start-layout
  .content
    background-color: white
    max-width: 680px
    margin: 0px auto
    display: block
    border-radius: 6px
    padding: 24px 16px
</style>
