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
      @select="selectedUnit = unit.id"
    ></unit>
  </div>
</template>

<script>
import Field from './Field.vue'
import Unit from './Unit.vue'

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
    let fields = []
    let units = [
      {
        id: 1,
        x: 2,
        y: 2,
        enegry: 10
      },
      {
        id: 2,
        x: 5,
        y: 2,
        enegry: 10
      },
      {
        id: 3,
        x: 2,
        y: 5,
        enegry: 10
      }
    ]
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        fields.push({ x, y, id: `${x}:${y}` })
      }
    }
    return {
      selectedUnit: null,
      units,
      fields
    }
  },

  computed: {
  },

  methods: {
  }
}
</script>

<style lang="sass" scoped>
.map
</style>
