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
      requiredEnergy: 2, // энергия, нужная для прыжка
      currentEnergy: 2, // начальная энергия
      currentHealth: 10, // начальное здоровье
      maxHealth: 50
    },
    // кролик "Толик"
    {
      id: 2,
      player: 1,
      speed: 3,
      x: 17,
      y: 17,
      requiredEnergy: 2,
      currentEnergy: 2,
      currentHealth: 10,
      maxHealth: 50
    }
  ]
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
    healthGrassFoodDelta: -1, // на сколько увеличивается здоровье при поедании сорника
    healthCactusFoodDelta: -10, // на сколько увеличивается здоровье при поедании кактуса

    mapWidth,
    mapHeight,
    fields,
    units,
    currentPlayer: 0,
    selectedUnitId: 1
  }
}
