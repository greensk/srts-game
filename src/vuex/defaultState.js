export default function () {
  const mapWidth = 20
  const mapHeight = 20
  let fields = []
  let units = [
    {
      id: 1,
      player: 0,
      speed: 4,
      x: 2,
      y: 2,
      requiredEnergy: 10,
      currentEnergy: 10,
      currentHealth: 10
    },
    {
      id: 2,
      player: 1,
      speed: 4,
      x: 17,
      y: 17,
      requiredEnergy: 10,
      currentEnergy: 10,
      currentHealth: 10
    }
  ]
  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      const rand = Math.random()
      if (rand < 0.02) {
        var type = 0
      } else if (rand < 0.04) {
        type = 1
      } else if (rand < 0.1) {
        type = 2
      } else {
        type = -1
      }
      fields.push({ x, y, id: `${x}:${y}`, type })
    }
  }
  return {
    status: 'connection',
    playerName: '',
    gameId: null,
    ownGame: false,
    games: null,
    gameToJoin: null,
    gameRequests: [],

    energyTimeoutDelta: 1,

    healthTimeoutDelta: -0.1,
    healthValidFoodDelta: 4,
    healthInvalidFoodDelta: -4,

    mapWidth,
    mapHeight,
    fields,
    units,
    currentPlayer: 0,
    selectedUnitId: null
  }
}
