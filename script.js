const gameSection = document.querySelector('#game-section')

let snakeLocation = [{ row: 15, column: 15 }]

const createGame = () => {
  displaySnake()
  displayFood()
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
  food.style.gridColumn = Math.floor(Math.random() * 30) + 1
  food.style.gridRow = Math.floor(Math.random() * 30) + 1
  gameSection.appendChild(food)
}

createGame()
