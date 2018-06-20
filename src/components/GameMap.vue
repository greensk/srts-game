<template>
  <div class="map">
    <field
      v-for="field in fields"
      :key="field.id"
      :x="field.x"
      :y="field.y"
    ></field>
    <unit
      v-for="unit in units"
      :selected="selectedUnit === unit.id"
      :key="unit.id"
      :x="unit.x"
      :y="unit.y"
      :energy="unit.energy"
      @select="selectUnit(unit)"
    ></unit>
  </div>
</template>

<script>
import Field from './Field.vue'
import Unit from './Unit.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Map',

  components: {
    Field,
    Unit
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
      selectedUnit: state => state.selectedUnit
    })
  },

  methods: {
    ...mapActions(['selectUnit'])
  }
}
</script>

<style lang="sass" scoped>
.map
</style>
