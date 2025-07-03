const gameSection = document.querySelector('#game-section')
const currentScoreSelector = document.querySelector('#current-score')
const currentScore2Selector = document.querySelector('#current-score-2')
const highestScoreSelector = document.querySelector('#highest-score')
const highestScore2Selector = document.querySelector('#highest-score-2')
const msgDiv = document.querySelector('#message-div')
const msg = document.querySelector('#message')
const singlePlayerBtn = document.querySelector('#singleplayer-btn')
const multiPlayerBtn = document.querySelector('#multiplayer-btn')

let snakeLocation = [{ row: 15, column: 15 }]

let snake2Location = [{ row: 15, column: 15 }]

let currentScore = 0

let currentScore2 = 0

let HighestScore = 0

let HighestScore2 = 0

let snakeDirection = 'right'

let snake2Direction = 'left'

let isSinglePlayer = true

const createGame = () => {
  gameSection.innerHTML = ''
  displayFood()
  displaySnake()
}

const displaySnake = () => {
  renderSnake(snakeLocation, 'snake')
  if (!isSinglePlayer) {
    renderSnake(snake2Location, 'snake2')
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
  let snakeHead = { ...snakeLocation[0] }
  let snakeDir = snakeDirection
  moveSnake(snakeHead, snakeDir, snakeLocation)

  if (!isSinglePlayer) {
    snakeHead = { ...snake2Location[0] }
    snakeDir = snake2Direction
    moveSnake(snakeHead, snakeDir, snake2Location)
  }
}

const moveSnake = (snakeHead, snakeDir, snakeCoord) => {
  switch (snakeDir) {
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

  snakeCoord.unshift(snakeHead)

  if (!checkForFoodCollision()) {
    snakeCoord.pop()
  }
}

const displayScore = () => {
  currentScoreSelector.innerText = currentScore
  highestScoreSelector.innerText = HighestScore
  currentScore2Selector.innerText = currentScore2
  highestScore2Selector.innerText = HighestScore2
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

  if (!isSinglePlayer) {
    let snake2Head = snake2Location[0]
    if (
      snake2Head.row === foodPosition.row &&
      snake2Head.column === foodPosition.column
    ) {
      if (HighestScore2 <= currentScore2) {
        HighestScore2++
      }
      currentScore2++
      displayScore()
      foodPosition = generateFoodPosition()
      return true
    }
  }
}

const checkForGameOver = (intervalID) => {
  let snakeHead = snakeLocation[0]
  let snake2Head = snake2Location[0]

  let selfCollision = snakeLocation.slice(1).some((element) => {
    if (element.row === snakeHead.row && element.column === snakeHead.column) {
      return true
    }
  })
  let collisionWithSnake2 = snake2Location.some((element) => {
    if (snakeHead.row === element.row && snakeHead.column === element.column) {
      return true
    }
  })

  if (
    snakeHead.row === 31 ||
    snakeHead.column === 31 ||
    snakeHead.row === 0 ||
    snakeHead.column === 0 ||
    selfCollision ||
    collisionWithSnake2
  ) {
    currentScore = 0
    snakeDirection = 'right'
    displayScore()
    snakeLocation = [{ row: 15, column: 15 }]
  }

  if (!isSinglePlayer) {
    let selfCollision = snake2Location.slice(1).some((element) => {
      if (
        element.row === snake2Head.row &&
        element.column === snake2Head.column
      ) {
        return true
      }
    })
    let collisionWithSnake1 = snakeLocation.some((element) => {
      if (
        snake2Head.row === element.row &&
        snake2Head.column === element.column
      ) {
        return true
      }
    })

    if (
      snake2Head.row === 31 ||
      snake2Head.column === 31 ||
      snake2Head.row === 0 ||
      snake2Head.column === 0 ||
      selfCollision ||
      collisionWithSnake1
    ) {
      currentScore2 = 0
      snake2Direction = 'left'
      displayScore()
      snake2Location = [{ row: 15, column: 15 }]
    }
  }
}

let foodPosition = generateFoodPosition()

/////////////////////////// Game Loop ///////////////////////////
const startGame = () => {
  msgDiv.style.opacity = 0

  const intervalID = setInterval(() => {
    snakeMovement()
    createGame()
    checkForGameOver(intervalID)
  }, 170)
}

/////////////////////////// Eventhandlers ///////////////////////////

const snake1DirHandler = (event) => {
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
const snake2DirHandler = (event) => {
  if (event.key === 'd' && snake2Direction !== 'left') {
    snake2Direction = 'right'
  } else if (event.key === 'a' && snake2Direction !== 'right') {
    snake2Direction = 'left'
  } else if (event.key === 'w' && snake2Direction !== 'down') {
    snake2Direction = 'up'
  } else if (event.key === 's' && snake2Direction !== 'up') {
    snake2Direction = 'down'
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
