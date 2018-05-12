const gameBoard = document.getElementById('game-board');
const playButton = document.getElementById('play-btn');
const resetButton = document.getElementById('reset-btn');
const moveCounter = document.getElementById('move-counter');
const thirdStar = document.getElementById('three-star');
const secondStar = document.getElementById('two-star');
const thirdStarModal = document.getElementById('three-star-modal');
const secondStarModal = document.getElementById('two-star-modal');
const gameTimer = document.getElementById('game-timer');
const closeModal = document.getElementById('close-modal');
const completeModal = document.getElementById('complete-modal');
const starRatingSpan = document.querySelector('.star-rating');
const gameOverTimeSpan = document.querySelector('.game-over-time');
const playAgainBtn = document.getElementById('play-again');
let gameOverTime = 0;
let otherCard;
let otherIconElement;
let cardsRevealed = 0;


const isGameOver = () => {
    let count = 0;
    let wrapperChildren = document.querySelectorAll('.card-front');
    for (wrapperChild of wrapperChildren) {
        if (wrapperChild.className === 'card-front reveal-front') {
          count++;
        } else {
        }
    }
    if (count === 12) {
        return true;
    } else {
        return false;
    }
}

//timer functions

const startTimer = () => timer = self.setInterval(incrementTimer, 1000);

const incrementTimer = () => {
    gameTimer.textContent++;
}

const stopTimer = () => {
    gameOverTime = gameTimer.textContent;
    clearInterval(timer);
    timer = null;
    gameTimer.textContent = 0;
}

//modal functions

const hideModal = () =>  {
    completeModal.className = 'hide';
}

const showModal = () => {
    completeModal.className = 'game-complete-modal';
    closeModal.addEventListener('click', hideModal);
    completeModal.addEventListener('click', hideModal);
    playAgainBtn.addEventListener('click', resetGame);
}


const randomIconSelection = () => {
    let iconClasses = [
        'icon fab fa-hooli', 
        'icon fab fa-pied-piper-hat', 
        'icon fab fa-pied-piper-alt', 
        'icon fab fa-js', 
        'icon fab fa-free-code-camp', 
        'icon fab fa-steam', 
        'icon fab fa-hooli', 
        'icon fab fa-pied-piper-hat', 
        'icon fab fa-pied-piper-alt', 
        'icon fab fa-js', 
        'icon fab fa-free-code-camp', 
        'icon fab fa-steam'
    ];
    let randomIconList = [];
    //get random number based on iconClasses length
    const randomIconIndex = () => {
        return Math.floor(Math.random() * iconClasses.length);
    }
    //get a random class name
    for (let i = 0; i < 12; i++) {
    let iconIndex = randomIconIndex();
    let removedClass = iconClasses.splice(iconIndex, 1).join();
    randomIconList.push(removedClass);
    }
    return randomIconList;
};

const starCheck = () => {
  if (moveCounter.textContent <= 16) {

  } else if (moveCounter.textContent > 16 && moveCounter.textContent < 30) {
    thirdStar.className = 'hide';
    thirdStarModal.className = 'hide';
    } else {
        secondStar.className = 'hide';
        secondStarModal.className = 'hide';
    }
}


const createCards = (cardIndex, randomIconList)=> {

    const respondToClick = (event, timer) => {
        let equalMatch;
        let notEqualMatch;
        //get the current card user has just clicked
        let currentCard = event.target.parentNode;
        //get the icon the user has just revealed 
        let currentIconElement = event.target;
        currentIconElement = currentIconElement.previousSibling.className;
        if (otherCard === undefined && cardsRevealed === 0) {
            otherCard = currentCard;
            otherIconElement = currentIconElement;
            cardFront.className = 'card-front reveal-front';
            cardsRevealed = 1;
            moveCounter.textContent++;
            starCheck();
        } else if (cardsRevealed === 1) {
            otherIconElement = otherCard.childNodes;
            otherIconElement = otherIconElement[0];
            otherIconElement = otherIconElement.className;
            cardsRevealed = 2;
            equalMatch = (otherIconElement === currentIconElement);
            notEqualMatch = (otherIconElement !== currentIconElement)
            cardFront.className = 'card-front reveal-front';
            moveCounter.textContent++;
            starCheck();
        } else {
            console.log('this is a click with two cards already revealed');
        }

        if (equalMatch && isGameOver()) {
            currentCard.className = 'card-front reveal-front';
            otherCard.className = 'card-front reveal-front';
            otherCard = undefined;
            cardsRevealed = 0;
            showModal();
            stopTimer();
            gameOverTimeSpan.innerHTML = gameOverTime;
        } else if (equalMatch) {
            currentCard.className = 'card-front reveal-front';
            otherCard.className = 'card-front reveal-front';
            otherCard = undefined;
            cardsRevealed = 0;
        } else if (notEqualMatch) {
            cardsRevealed = 0;
            setTimeout(function () {  
            otherCard.className = 'card-front card';
            currentCard.className = 'card-front card';
            otherCard = undefined;
            gameBoard.className = 'wrapper';
            }, 500);
        }
    } 
    const cardFront = document.createElement('div');
    const iconHtml = document.createElement('i');
    //create card front
    cardFront.className = 'card-front card';
    gameBoard.appendChild(cardFront);
    iconHtml.className = randomIconList[cardIndex];
    cardFront.appendChild(iconHtml);
     //adds listener
    cardFront.addEventListener('click', respondToClick);

    //create card back
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back card';
    let currentCardFront = cardFront;

    //the cyan cardBack is a child of cardFront
    currentCardFront.appendChild(cardBack);
}


const createBoard = () => {
  let randomIconList = randomIconSelection();
  for (let cardIndex = 0; cardIndex < 12; cardIndex++) {
    createCards(cardIndex, randomIconList);
  }
};

const playGame = function(){
    const wrapperChildren = document.querySelectorAll('.card-front');
    for (wrapperChild of wrapperChildren) {
        wrapperChild.remove();
    }    
    moveCounter.textContent = 0;
    createBoard();
    startTimer();
}

const resetGame = function(){
        const wrapperChildren = document.querySelectorAll('.card-front');
        for (wrapperChild of wrapperChildren) {
            wrapperChild.remove();
        }    
        moveCounter.textContent = 0;
        stopTimer();
    }

playButton.addEventListener('click', playGame);

resetButton.addEventListener('click', resetGame);

