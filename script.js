const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

const color = ['#5bc0de', '#d9534f', '#5cb85c', '#588585','#ffc000', '#FF1493']

let currentActiveCard = 0
const cardsEl = []
const cardsData = getCardsData()

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement('div')
  let randomColor = Math.floor(Math.random() * color.length)
  card.classList.add('card')
  if (index === 0) {
    card.classList.add('active')
  }

  card.innerHTML = `
  <div class="inner-card">
  <div style="background-color: ${color[randomColor]}" class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div style="background-color: ${color[randomColor]}" class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `

  card.addEventListener('click', (e) => {
    card.classList.toggle('show-answer')
  })

  cardsEl.push(card)

  cardsContainer.appendChild(card)

  updateCurrentText()
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'))
  return cards === null ? [] : cards
}

function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards))
  window.location.reload()
}

createCards()

nextBtn.addEventListener('click', () => {
  if(cardsEl[currentActiveCard] === undefined) return
  cardsEl[currentActiveCard].className = 'card left'

  currentActiveCard = currentActiveCard + 1

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText()
})

prevBtn.addEventListener('click', () => {
  if(cardsEl[currentActiveCard] === undefined) return
  cardsEl[currentActiveCard].className = 'card right'

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active'

  updateCurrentText()
})

showBtn.addEventListener('click', () => addContainer.classList.add('show'))
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'))

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value
  const answer = answerEl.value

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer }

    createCard(newCard)

    questionEl.value = ''
    answerEl.value = ''

    addContainer.classList.remove('show')

    cardsData.push(newCard)
    setCardsData(cardsData)
  }
})

clearBtn.addEventListener('click', () => {

  cardsData.forEach((card, index) => {
    if(cardsData[currentActiveCard] === cardsData[index]) {
      cardsData.splice(index, 1)
    }

    setCardsData(cardsData)
  })

})
