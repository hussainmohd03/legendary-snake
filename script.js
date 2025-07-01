const gameSection = document.querySelector('#game-section')
const currentScoreSelector = document.querySelector('#current-score')
const highestScoreSelector = document.querySelector('#highest-score')
const msgDiv = document.querySelector('#message-div')
const msg = document.querySelector('#message')
const btn = document.querySelector('#btn')

let snakeLocation = [{ row: 15, column: 15 }]

let currentScore = 0

let HighestScore = 0

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

  if (!checkForFoodCollision()) {
    snakeLocation.pop()
  }
}

const displayScore = () => {
  currentScoreSelector.innerText = currentScore
  highestScoreSelector.innerText = HighestScore
}

const checkForFoodCollision = () => {
  let snakeHead = snakeLocation[0]
  if (
    snakeHead.row === foodPosition.row &&
    snakeHead.column === foodPosition.column
  ) {
    if (HighestScore <= currentScore) {
      HighestScore++
    }
    currentScore++
    displayScore()
    foodPosition = generateFoodPosition()
    return true
  }
}

const checkForGameOver = (intervalID) => {
  let snakeHead = snakeLocation[0]

  let selfCollision = snakeLocation.slice(1).some((element) => {
    if (element.row === snakeHead.row && element.column === snakeHead.column) {
      return true
    }
  })

  if (
    snakeHead.row === 31 ||
    snakeHead.column === 31 ||
    snakeHead.row === -1 ||
    snakeHead.column === -1 ||
    selfCollision
  ) {
    clearInterval(intervalID)
  }
}

let foodPosition = generateFoodPosition()

/////////////////////////// Game Loop ///////////////////////////
const startGame = () => {
  const intervalID = setInterval(() => {
    moveSnake()
    createGame()
    checkForGameOver(intervalID)
  }, 170)
}

/////////////////////////// Eventhandlers ///////////////////////////

const changeDirection = (event) => {
  if (event.key === 'ArrowRight' && snakeDirection !== 'left') {
    snakeDirection = 'right'
  } else if (event.key === 'ArrowLeft' && snakeDirection !== 'right') {
    snakeDirection = 'left'
  } else if (event.key === 'ArrowUp' && snakeDirection !== 'down') {
    snakeDirection = 'up'
  } else if (event.key === 'ArrowDown' && snakeDirection !== 'up') {
    snakeDirection = 'down'
  }
}

/////////////////////////// EventListeners ///////////////////////////

document.addEventListener('keydown', changeDirection)
btn.addEventListener('click', () => {
  msgDiv.style.opacity = 0
  startGame()
})
