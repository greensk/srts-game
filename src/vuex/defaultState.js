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
      currentEnergy: 10
    },
    {
      id: 2,
      player: 0,
      speed: 4,
      x: 5,
      y: 2,
      requiredEnergy: 10,
      currentEnergy: 10
    },
    {
      id: 3,
      player: 0,
      speed: 4,
      x: 2,
      y: 5,
      requiredEnergy: 10,
      currentEnergy: 10
    },
    {
      id: 4,
      player: 1,
      speed: 4,
      x: 17,
      y: 17,
      requiredEnergy: 10,
      currentEnergy: 10
    },
    {
      id: 5,
      player: 1,
      speed: 4,
      x: 14,
      y: 17,
      requiredEnergy: 10,
      currentEnergy: 10
    },
    {
      id: 6,
      player: 1,
      speed: 4,
      x: 17,
      y: 14,
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
    status: 'wait',
    playerName: '',
    gameId: null,
    ownGame: false,
    games: null,
    gameToJoin: null,
    gameRequests: [],

    mapWidth,
    mapHeight,
    fields,
    units,
    currentPlayer: 0,
    selectedUnitId: null
  }
}
