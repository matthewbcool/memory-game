const gameBoard = document.getElementById('game-board');
const playButton = document.getElementById('play-btn');
const moveCounter = document.getElementById('move-counter');
let otherCard;
let otherIconElement;
let cardsRevealed = 0;
moveCounter.textContent='0';


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


//TODO: Add cards revealed counter to check against revealing more than two cards

const createCards = (cardIndex, randomIconList)=> {

    const respondToClick = (event) => {
        let equalMatch;
        let notEqualMatch;
        gameBoard.removeEventListener('click', function () {
            console.log('game board event removed');
        })
        moveCounter.textContent++;
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
        } else if (cardsRevealed === 1) {
            otherIconElement = otherCard.childNodes;
            otherIconElement = otherIconElement[0];
            otherIconElement = otherIconElement.className;
            cardsRevealed = 2;
            equalMatch = (otherIconElement === currentIconElement);
            notEqualMatch = (otherIconElement !== currentIconElement)
            cardFront.className = 'card-front reveal-front';
        } else {
            console.log('please wait for cards to reset');
        }

        if (equalMatch) {
            currentCard.className = 'card-front reveal-front';
            otherCard.className = 'card-front reveal-front';
            otherCard = undefined;
            cardsRevealed = 0;
        }
        if (notEqualMatch) {
            cardsRevealed = 0;
            setTimeout(function () {  
            otherCard.className = 'card-front card';
            currentCard.className = 'card-front card';
            otherCard = undefined;
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
  //console.log('The boards current working array is: ' + randomIconList);
  for (let cardIndex = 0; cardIndex < 12; cardIndex++) {
    createCards(cardIndex, randomIconList);
  }
};

playButton.addEventListener('click', function(){
    //first remove existing cards before setting up new board
    const wrapperChildren = document.querySelectorAll('.card-front');
    for (wrapperChild of wrapperChildren) {
        wrapperChild.remove();
    }
    moveCounter.textContent = 0;
    createBoard();
})
