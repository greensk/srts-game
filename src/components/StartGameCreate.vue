<template>
  <div class="start-game-create">
    <q-btn
      label="Создать игру"
      @click="$emit('create')"
    ></q-btn>
  </div>
</template>

<script>
import { QBtn } from 'quasar-framework/dist/quasar.mat.esm'

export default {
  name: 'StartGameCreate',

  components: {
    QBtn
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
.start-game-create
</style>
