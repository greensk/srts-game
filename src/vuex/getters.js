export default {
  currentUnit (state) {
    return state.units.find(u => u.id === state.selectedUnitId)
  },
  reachableFields (state, getters) {
    if (!getters.currentUnit) {
      return []
    }
    const speed = getters.currentUnit.speed
    /*
    let matrix = []
    for (var x = 0; x < state.mapWidth; x++) {
      let line = []
      for (var y = 0; y < state.mapHeight; y++) {
        line.push(null)
      }
      matrix.push(line)
    }
    for (var dest = 0; currentSpeed > 0; currentSpeed)
      */
    return state.fields.filter((field) => {
      return Math.sqrt(
        Math.pow(field.x - getters.currentUnit.x, 2) + Math.pow(field.y - getters.currentUnit.y, 2)
      ) <= speed
    })
  }
}
