const gameSection = document.querySelector('#game-section')

let snakeLocation = [{ row: 15, column: 15 }]

const createGame = () => {
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

createGame()
