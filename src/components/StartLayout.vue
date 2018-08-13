<template>
  <div class="start-layout">
    <div class="logo-line">
      <img src="/static/logo.png">
    </div>
    <div class="logo-line">
      <div class="rules">
        <p>{{ $t('rules.1') }}</p>
        <p>
          <img class="example" src="/static/example0.png">
          <img class="example" src="/static/example1.png">
        </p>
        <p>{{ $t('rules.2') }}</p>
        <p>{{ $t('rules.3') }}</p>
      </div>
    </div>
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

.rules
  margin: 35px 0px

.example
  margin: 0px 20px
</style>
