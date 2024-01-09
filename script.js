document.addEventListener('DOMContentLoaded', function () {
  const emojis = ['🐱', '🐶', '🐰', '🐸', '🐻', '🦊', '🐨', '🐼'];
  const cards = [...emojis, ...emojis]; // Duplicate emojis to create pairs

  const memoryGame = document.getElementById('memory-game');
  const moveCountElement = document.getElementById('move-count');
  const congratsMessage = document.getElementById('congrats-message');
  const refreshBtn = document.getElementById('refresh-btn');
  
  let liveMoves = 0;

  let flippedCards = [];
  let matchedPairs = 0;

  // Shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  // Create and append cards to the memory game container
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.cardValue = card;
    cardElement.addEventListener('click', () => flipCard(cardElement));

    const cardFace = document.createElement('div');
    cardFace.classList.add('card-face', 'front-face');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-face', 'back-face');
    cardBack.textContent = card;

    cardElement.appendChild(cardFace);
    cardElement.appendChild(cardBack);

    memoryGame.appendChild(cardElement);
  });

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }

  // Only count a move when the second card is clicked
  if (flippedCards.length === 1) {
    liveMoves++;
    moveCountElement.textContent = liveMoves;
  }
}


  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.cardValue === card2.dataset.cardValue) {
      card1.classList.add('matched', 'win');
      card2.classList.add('matched', 'win');
      card1.querySelector('.back-face').textContent = '🏆'; // Win emoji
      card2.querySelector('.back-face').textContent = '🏆'; // Win emoji
      matchedPairs++;

      if (matchedPairs === emojis.length) {
        congratsMessage.textContent = `Congratulations! You won the game in ${liveMoves} ${liveMoves === 1 ? 'move' : 'moves'}!`;
        congratsMessage.style.color = '#4CAF50';
        refreshBtn.style.backgroundColor = '#4CAF50';
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      liveMoves++; // Count the second move
      moveCountElement.textContent = liveMoves;
    }

    flippedCards = [];
  }

  // Function to reset the game
  window.resetGame = function() {
    // Reset variables
    flippedCards = [];
    matchedPairs = 0;
    liveMoves = 0;

    // Reset the move counter
    moveCountElement.textContent = liveMoves;

    // Reset the congrats message
    congratsMessage.textContent = '';

    // Reset the refresh button style
    refreshBtn.style.backgroundColor = '#4CAF50';

    // Reset the card states
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
      card.classList.remove('flipped', 'matched', 'win');
      card.querySelector('.back-face').textContent = '';
    });

    // Shuffle the cards again
    cards.sort(() => Math.random() - 0.5);
    allCards.forEach((card, index) => {
      card.dataset.cardValue = cards[index];
      card.querySelector('.back-face').textContent = cards[index];
    });
  };
});
