const gameBoard = document.getElementById('game-board');
const playButton = document.getElementById('play-btn');



const createCards = ()=> {
    const respondToClick = () => {
        cardFront.className = 'card-front reveal-front';
      }

    const cardFront = document.createElement('div');
    //create card front
    cardFront.className = 'card-front card';
    gameBoard.appendChild(cardFront);
     //adds listener
    cardFront.addEventListener('click', respondToClick);

    //create card back
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back card';
    let currentCardFront = cardFront;

    //cardBack is a child of cardFront
    currentCardFront.appendChild(cardBack);
}





const createBoard = () => {
  for (let i = 0; i < 12; i++) {
    createCards(); 
  };
}

playButton.addEventListener('click', function(){
    //first remove existing cards before setting up new board
    const wrapperChildren = document.querySelectorAll('.card-front');
    for (wrapperChild of wrapperChildren) {
        wrapperChild.remove();
    }
    createBoard();
})
