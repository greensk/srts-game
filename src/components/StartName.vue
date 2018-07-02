<template>
  <div class="start-name">
    <q-input
      float-label="Укажите имя игрока"
      v-model="playerName"
    />
    <q-btn
      label="Далее"
      @click="$emit('set-name', {name: playerName})"
    />
  </div>
</template>

<script>
import { QInput, QBtn, QField } from 'quasar-framework/dist/quasar.mat.esm'
export default {
  name: 'StartName',

  components: {
    QInput,
    QBtn,
    QField
  },

  props: {
  },

  data () {
    return {
      playerName: ''
    }
  },

  computed: {
  },

  methods: {
  }
}
</script>

<style lang="sass" scoped>
.start-name
</style>
