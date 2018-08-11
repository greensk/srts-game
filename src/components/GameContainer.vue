<template>
  <div class="game-container">
    <field
      v-for="field in fields"
      :key="field.id"
      :status="getFieldStatus(field)"
      :x="field.x"
      :y="field.y"
      :type="field.type"
      @go="goToField({unitId: selectedUnitId, field})"
    ></field>
    <unit
      v-for="unit in units"
      :selected="selectedUnitId === unit.id"
      :status="getUnitStatus(unit)"
      :key="unit.id"
      :x="unit.x"
      :y="unit.y"
      :player="unit.player"
      :current-energy="unit.currentEnergy"
      :required-energy="unit.requiredEnergy"
      @select="selectUnit({ unit: unit, priv: true })"
    ></unit>
    <base-timer
      :timeout="1000"
      @timer="unitsTimeoutUpdate"
    ></base-timer>
    <base-timer
      :timeout="7000"
      @timer="regeneration"
    ></base-timer>
  </div>
</template>

<script>
import Field from './Field.vue'
import Unit from './Unit.vue'
import BaseTimer from './BaseTimer.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'GameContainer',

  components: {
    Field,
    Unit,
    BaseTimer
  },

  props: {
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 20
    }
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      units: state => state.units,
      fields: state => state.fields,
      selectedUnitId: state => state.selectedUnitId,
      currentPlayer: state => state.currentPlayer
    }),
    ...mapGetters(['reachableFields'])
  },

  methods: {
    ...mapActions([
      'selectUnit',
      'goToField',
      'unitsTimeoutUpdate',
      'regeneration'
    ]),
    getFieldStatus (field) {
      if (this.selectedUnitId !== null) {
        if (this.reachableFields.indexOf(field) > -1) {
          return 'reachable'
        } else {
          return 'unreachable'
        }
      }
      return 'none'
    },
    getUnitStatus (unit) {
      if (unit.player !== this.currentPlayer) {
        return 'enemy'
      } else if (this.selectedUnitId !== null && unit.id === this.selectedUnitId) {
        return 'selected'
      } else if (unit.currentEnergy === unit.requiredEnergy) {
        return 'selectable'
      } else {
        return 'waiting'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.game-container
</style>
