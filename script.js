const gameSection = document.querySelector('#game-section')
const currentScoreSelector = document.querySelector('#current-score')
const currentScore2Selector = document.querySelector('#current-score-2')
const highestScoreSelector = document.querySelector('#highest-score')
const highestScore2Selector = document.querySelector('#highest-score-2')
const msgDiv = document.querySelector('#message-div')
const msg = document.querySelector('#message')
const singlePlayerBtn = document.querySelector('#singleplayer-btn')
const multiPlayerBtn = document.querySelector('#multiplayer-btn')

const player1 = {
  snake: [{ row: 15, column: 15 }],
  direction: 'right',
  defaultDirection: 'right',
  score: 0,
  highestScore: 0
}
const player2 = {
  snake: [{ row: 15, column: 15 }],
  direction: 'left',
  defaultDirection: 'left',
  score: 0,
  highestScore: 0
}

let isSinglePlayer = true

const createGame = () => {
  gameSection.innerHTML = ''
  displayFood()
  displaySnake()
}

const displaySnake = () => {
  renderSnake(player1.snake, 'snake')
  if (!isSinglePlayer) {
    renderSnake(player2.snake, 'snake2')
  }
}

const renderSnake = (snakeCord, className) => {
  snakeCord.forEach((element) => {
    const snakeSegment = document.createElement('div')
    snakeSegment.setAttribute('class', className)
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

const snakeMovement = () => {
  moveSnake(player1)
  if (!isSinglePlayer) {
    moveSnake(player2)
  }
}

const moveSnake = (player) => {
  let head = { ...player.snake[0] }
  switch (player.direction) {
    case 'right':
      head.column++
      break
    case 'left':
      head.column--
      break
    case 'up':
      head.row--
      break
    case 'down':
      head.row++
      break
  }
  player.snake.unshift(head)
  if (!FoodCollision(player)) {
    player.snake.pop()
  }
}

const displayScore = () => {
  currentScoreSelector.innerText = player1.score
  highestScoreSelector.innerText = player1.highestScore
  currentScore2Selector.innerText = player2.score
  highestScore2Selector.innerText = player2.highestScore
}

const FoodCollision = (player) => {
  let head = player.snake[0]
  if (head.row === foodPosition.row && head.column === foodPosition.column) {
    if (player.highestScore <= player.score) {
      player.highestScore++
    }
    player.score++
    displayScore()
    foodPosition = generateFoodPosition()
    return true
  }
}

const GameOver = () => {
  isGameOver(player1, player2)
  if (!isSinglePlayer) {
    isGameOver(player2, player1)
  }
}

const isGameOver = (player, otherPlayer) => {
  let head = player.snake[0]

  let selfCollision = player.snake.slice(1).some((element) => {
    if (element.row === head.row && element.column === head.column) {
      return true
    }
  })

  let collisionWith = otherPlayer.snake.some((element) => {
    if (head.row === element.row && head.column === element.column) {
      return true
    }
  })

  if (
    head.row === 31 ||
    head.column === 31 ||
    head.row === 0 ||
    head.column === 0 ||
    selfCollision ||
    collisionWith
  ) {
    player.score = 0
    player.direction = player.defaultDirection
    displayScore()
    player.snake = [{ row: 15, column: 15 }]
  }
}

let foodPosition = generateFoodPosition()

/////////////////////////// Game Loop ///////////////////////////
const startGame = () => {
  msgDiv.style.opacity = 0

  const intervalID = setInterval(() => {
    snakeMovement()
    GameOver()
    createGame()
  }, 170)
}

/////////////////////////// Eventhandlers ///////////////////////////

const snake1DirHandler = (event) => {
  if (event.key === 'ArrowRight' && player1.direction !== 'left') {
    player1.direction = 'right'
  } else if (event.key === 'ArrowLeft' && player1.direction !== 'right') {
    player1.direction = 'left'
  } else if (event.key === 'ArrowUp' && player1.direction !== 'down') {
    player1.direction = 'up'
  } else if (event.key === 'ArrowDown' && player1.direction !== 'up') {
    player1.direction = 'down'
  }
}
const snake2DirHandler = (event) => {
  if (event.key === 'd' && player2.direction !== 'left') {
    player2.direction = 'right'
  } else if (event.key === 'a' && player2.direction !== 'right') {
    player2.direction = 'left'
  } else if (event.key === 'w' && player2.direction !== 'down') {
    player2.direction = 'up'
  } else if (event.key === 's' && player2.direction !== 'up') {
    player2.direction = 'down'
  }
}

/////////////////////////// EventListeners ///////////////////////////

document.addEventListener('keydown', snake1DirHandler)
document.addEventListener('keydown', snake2DirHandler)
singlePlayerBtn.addEventListener('click', startGame)
multiPlayerBtn.addEventListener('click', () => {
  isSinglePlayer = false
  highestScore2Selector.style.opacity = 1
  currentScore2Selector.style.opacity = 1
  startGame()
})
