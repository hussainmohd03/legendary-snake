const gameSection = document.querySelector('#game-section')

let snakeLocation = [{ row: 15, column: 15 }]

let snakeDirection = 'right'

const createGame = () => {
  gameSection.innerHTML = ''
  displayFood()
  displaySnake()
}

const displaySnake = () => {
  snakeLocation.forEach((element) => {
    const snakeSegment = document.createElement('div')
    snakeSegment.setAttribute('class', 'snake')
    snakeSegment.style.gridColumn = element.column
    snakeSegment.style.gridRow = element.row
    gameSection.appendChild(snakeSegment)
  })
}

const displayFood = () => {
  const food = document.createElement('div')
  food.setAttribute('class', 'food')
  food.style.gridColumn = foodPosition.column
  food.style.gridRow = foodPosition.row
  gameSection.appendChild(food)
}

const generateFoodPosition = () => {
  const row = Math.floor(Math.random() * 30) + 1
  const column = Math.floor(Math.random() * 30) + 1
  return { row, column }
}

const moveSnake = () => {
  let snakeHead = { ...snakeLocation[0] }

  // snakeLocation.pop()

  switch (snakeDirection) {
    case 'right':
      snakeHead.column++
      break
    case 'left':
      snakeHead.column--
      break
    case 'up':
      snakeHead.row--
      break
    case 'down':
      snakeHead.row++
      break
  }

  snakeLocation.unshift(snakeHead)
}

let foodPosition = generateFoodPosition()

setInterval(() => {
  moveSnake()
  createGame()
}, 170)
