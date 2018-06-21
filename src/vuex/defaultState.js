export default function () {
  const mapWidth = 20
  const mapHeight = 20
  let fields = []
  let units = [
    {
      id: 1,
      speed: 4,
      x: 2,
      y: 2,
      requiredEnergy: 10,
      currentEnergy: 10
    },
    {
      id: 2,
      speed: 4,
      x: 5,
      y: 2,
      requiredEnergy: 10,
      currentEnergy: 10
    },
    {
      id: 3,
      speed: 4,
      x: 2,
      y: 5,
      requiredEnergy: 10,
      currentEnergy: 10
    }
  ]
  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      fields.push({ x, y, id: `${x}:${y}` })
    }
  }
  return {
    mapWidth,
    mapHeight,
    fields,
    units,
    selectedUnitId: null
  }
}
