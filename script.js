const game = document.querySelector('#game');
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan"

]

// shuffle function
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(colors);

//create cards for colors.length
const createCards = () => {
  for(color of shuffledColors){
    let mainCard = document.createElement('div')
    let frontFace = document.createElement('div')
    let backFace = document.createElement('img')
    backFace.setAttribute('src', 'javascript.svg')
    frontFace.classList.add('front-face')
    frontFace.style.background = color
    backFace.classList.add('back-face')
    mainCard.appendChild(frontFace)
    mainCard.appendChild(backFace)
    mainCard.classList.add(color,'card')
    game.appendChild(mainCard)
  }
}
createCards()

const cards = document.querySelectorAll('.card')
cards.forEach(card => {
  card.addEventListener('click', flipCard)
})

function flipCard  (e) {
  if(noClicking) return;
  this.classList.toggle('flip');
  let currentCard = e.target.parentElement

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard; 
  }

  if(card1 && card2){
    noClicking = true;
    let firstMatch = card1.className
    let secondMatch = card2.className

    if(firstMatch === secondMatch){
      cardsFlipped += 2;
      card1.removeEventListener("click", flipCard);
      card2.removeEventListener("click", flipCard);
      card1 = null;
      card2 = null;
      noClicking = false
    }else {
      setTimeout(function() {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }
  if (cardsFlipped === colors.length) alert("game over!");
}




