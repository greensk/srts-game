export default function () {
  const mapWidth = 20 // ширина карты (в клетках)
  const mapHeight = 20 // высота карты (в клетках)
  let fields = []
  let units = [
    // обезьяна "Яна"
    {
      id: 1,
      player: 0,
      speed: 3, // расстояние за один прыжок
      x: 2, // начальная позиция, координата X
      y: 2, // начальная позиция, координата Y
      requiredEnergy: 3, // энергия, нужная для прыжка
      currentEnergy: 3, // начальная энергия
      currentHealth: 10 // начальное здоровье
    },
    // кролик "Толик"
    {
      id: 2,
      player: 1,
      speed: 3,
      x: 17,
      y: 17,
      requiredEnergy: 3,
      currentEnergy: 3,
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

    energyTimeoutDelta: 1, // на сколько увеличивается энергия за 1c

    healthTimeoutDelta: -0.1, // на сколько увеличивается здоровье за 1с
    healthValidFoodDelta: 4, // на сколько увеличивается здоровье при поедании своей еды
    healthInvalidFoodDelta: -4, // на сколько увеличивается здоровье при поедании не своей еды

    mapWidth,
    mapHeight,
    fields,
    units,
    currentPlayer: 0,
    selectedUnitId: 1
  }
}
