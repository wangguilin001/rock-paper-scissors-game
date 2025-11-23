// GAME

let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = 'tie'
  }
  if (
    (playerSelection === '石头' && computerSelection === '剪刀') ||
    (playerSelection === '剪刀' && computerSelection === '布') ||
    (playerSelection === '布' && computerSelection === '石头')
  ) {
    playerScore++
    roundWinner = 'player'
  }
  if (
    (computerSelection === '石头' && playerSelection === '剪刀') ||
    (computerSelection === '剪刀' && playerSelection === '布') ||
    (computerSelection === '布' && playerSelection === '石头')
  ) {
    computerScore++
    roundWinner = 'computer'
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return '石头'
    case 1:
      return '布'
    case 2:
      return '剪刀'
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('石头'))
paperBtn.addEventListener('click', () => handleClick('布'))
scissorsBtn.addEventListener('click', () => handleClick('剪刀'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal()
    return
  }

  const computerSelection = getRandomChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case '石头':
      playerSign.textContent = '✊'
      break
    case '布':
      playerSign.textContent = '✋'
      break
    case '剪刀':
      playerSign.textContent = '✌'
      break
  }

  switch (computerSelection) {
    case '石头':
      computerSign.textContent = '✊'
      break
    case '布':
      computerSign.textContent = '✋'
      break
    case '剪刀':
      computerSign.textContent = '✌'
      break
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "平局！"
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = '你赢了！'
  } else if (roundWinner === 'computer') {
    scoreInfo.textContent = '你输了！'
  }

  playerScorePara.textContent = `你: ${playerScore}`
  computerScorePara.textContent = `人机: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'player') {
    scoreMessage.textContent = `${playerSelection} 击败 ${computerSelection}`
    return
  }
  if (winner === 'computer') {
    scoreMessage.textContent = `${computerSelection} 击败 ${playerSelection}`
    return
  }

  scoreMessage.textContent = `${playerSelection} 和 ${computerSelection}平局`
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = '你赢了!')
    : (endgameMsg.textContent = '你才是人机吧...')
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreInfo.textContent = '选择你的出拳'
  scoreMessage.textContent = '先得5分的人获胜'
  playerScorePara.textContent = '你: 0'
  computerScorePara.textContent = '人机: 0'
  playerSign.textContent = '❔'
  computerSign.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}
