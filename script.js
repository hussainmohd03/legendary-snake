const gameSection = document.querySelector('#game-section')
const currentScoreSelector = document.querySelector('#current-score')
const highestScoreSelector = document.querySelector('#highest-score')
const msgDiv = document.querySelector('#message-div')
const msg = document.querySelector('#message')
const singlePlayerBtn = document.querySelector('#singleplayer-btn')
const multiPlayerBtn = document.querySelector('#multiplayer-btn')

let snakeLocation = [{ row: 15, column: 15 }]

let snake2Location = [{ row: 15, column: 15 }]

let currentScore = 0

let HighestScore = 0

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
  if (!isSinglePlayer) {
    let snake2Head = { ...snake2Location[0] }
    switch (snake2Direction) {
      case 'right':
        snake2Head.column++
        break
      case 'left':
        snake2Head.column--
        break
      case 'up':
        snake2Head.row--
        break
      case 'down':
        snake2Head.row++
        break
    }

    snake2Location.unshift(snake2Head)

    if (!checkForFoodCollision()) {
      snake2Location.pop()
    }
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

  if (!isSinglePlayer) {
    let snake2Head = snake2Location[0]
    if (
      snake2Head.row === foodPosition.row &&
      snake2Head.column === foodPosition.column
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
    snakeHead.row === 0 ||
    snakeHead.column === 0 ||
    selfCollision
  ) {
    currentScore = 0
    snakeDirection = 'right'
    displayScore()
    snakeLocation = [{ row: 15, column: 15 }]
  }

  if (!isSinglePlayer) {
    let snake2Head = snake2Location[0]

    let selfCollision = snake2Location.slice(1).some((element) => {
      if (
        element.row === snake2Head.row &&
        element.column === snake2Head.column
      ) {
        return true
      }
    })

    if (
      snake2Head.row === 31 ||
      snake2Head.column === 31 ||
      snake2Head.row === 0 ||
      snake2Head.column === 0 ||
      selfCollision
    ) {
      currentScore = 0
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
    moveSnake()
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
  startGame()
})
