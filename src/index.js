import './main.scss';
import './dark.scss';

import { initGame } from './ininGame';

initGame();

let setup = document.querySelector('.settings__btn');

setup.addEventListener('click', changeSettings);

function changeSettings() {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    setup.textContent = 'light theme';
  } else {
    setup.textContent = 'dark theme';
  }
}
