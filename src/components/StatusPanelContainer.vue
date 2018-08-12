<template>
  <status-panel
    :my-energy="myUnit.currentEnergy"
    :my-health="myUnit.currentHealth"
    :enemy-energy="enemyUnit.currentEnergy"
    :enemy-health="enemyUnit.currentHealth"
    :max-health="myUnit.maxHealth"
  ></status-panel>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
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
    }),
    ...mapGetters([
      'myUnit',
      'enemyUnit'
    ])
  },

  methods: {
    ...mapActions([
    ])
  }
}
</script>
