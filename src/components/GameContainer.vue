<template>
  <div class="game-wrapper">
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
        :current-health="unit.currentHealth"
        :required-health="unit.requiredHealth"
        :max-health="unit.maxHealth"
        @select="selectUnit({ unit: unit, priv: true })"
      ></unit>
      <base-timer
        v-if="currentPlayer === 0"
        :timeout="800"
        @timer="onTimer"
      ></base-timer>
      <!--
      <base-timer
        :timeout="7000"
        @timer="regeneration"
      ></base-timer>
      -->
    </div>
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

  mounted () {
    console.log('INIT CONTAINER')
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
    },
    onTimer () {
      this.unitsTimeoutUpdate({ priv: true })
      this.regeneration({ priv: true })
    }
  }
}
</script>

<style lang="sass" scoped>
.game-wrapper
  display: flex
  justify-content: center
  align-items: center
  min-width: 100vw
  min-height: 100vh
.game-container
  display: block
  position: relative
  width: 800px
  height: 800px
  box-shadow: 0px 0px 12px 2px rgba(0,0,0,0.75)
</style>
