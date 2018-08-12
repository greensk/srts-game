<template>
  <status-panel
    :my-energy="unit1.currentEnergy"
    :my-health="unit1.currentHealth"
    :enemy-energy="unit2.currentEnergy"
    :enemy-health="unit2.currentHealth"
    :max-health="unit1.maxHealth"
  ></status-panel>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StatusPanel from './StatusPanel.vue'

export default {
  name: 'StatusPanelContainer',

  components: {
    StatusPanel
  },

  props: {
  },

  computed: {
    ...mapState({
      units: state => state.units
    }),
    unit1 () {
      return this.units.find(u => u.id === 1)
    },
    unit2 () {
      return this.units.find(u => u.id === 2)
    }
  },

  methods: {
    ...mapActions([
    ])
  }
}
</script>
