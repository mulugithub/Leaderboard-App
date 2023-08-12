import './styles.css';
import Game from './modules/game';

const game = new Game();

const userInput = document.querySelector('.name');
const scoreInput = document.querySelector('.score');
const clearInputFields = async () => {
  userInput.value = '';
  scoreInput.value = '';
};

const addButton = document.getElementById('add-btn');
const refreshButton = document.getElementById('refresh-btn');

document.addEventListener('DOMContentLoaded', () => {
  // game.newGame();
  game.refresh();
});
refreshButton.addEventListener('click', () => {
  game.refresh();
});

addButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const user = userInput.value;
  const score = parseInt(scoreInput.value, 10);
  await game.saveScores(user, score);
  clearInputFields();
});