<template>
  <div class="map">
    <field
      v-for="field in fields"
      :key="field.id"
      :status="getFieldStatus(field)"
      :x="field.x"
      :y="field.y"
      @go="goToField(field)"
    ></field>
    <unit
      v-for="unit in units"
      :selected="selectedUnitId === unit.id"
      :key="unit.id"
      :x="unit.x"
      :y="unit.y"
      :current-energy="unit.currentEnergy"
      :required-energy="unit.requiredEnergy"
      @select="selectUnit(unit)"
    ></unit>
    <base-timer
      :timeout="1000"
      @timer="unitsEnergyUpdate"
    ></base-timer>
  </div>
</template>

<script>
import Field from './Field.vue'
import Unit from './Unit.vue'
import BaseTimer from './BaseTimer.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Map',

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
      selectedUnitId: state => state.selectedUnitId
    }),
    ...mapGetters(['reachableFields'])
  },

  methods: {
    ...mapActions([
      'selectUnit',
      'goToField',
      'unitsEnergyUpdate'
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
    }
  }
}
</script>

<style lang="sass" scoped>
.map
</style>
