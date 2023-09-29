import { Minefield } from './startGame';

export function initGame() {
  let a = new Minefield(10, 10, 10);
  a.addField();

  let newGame = document.createElement('button');
  newGame.className = 'settings__new-game';
  newGame.textContent = 'NEW GAME';

  let chooseLevel = document.createElement('select');
  chooseLevel.className = 'settings__level';
  chooseLevel.id = 'level-select';

  let levelLabel = document.createElement('label');
  levelLabel.textContent = 'field:';
  levelLabel.setAttribute('for', 'level-select');

  let easyLevel = document.createElement('option');
  easyLevel.textContent = '10x10';
  chooseLevel.appendChild(easyLevel);

  let mediumLevel = document.createElement('option');
  mediumLevel.textContent = '15x15';
  chooseLevel.appendChild(mediumLevel);

  let hardLevel = document.createElement('option');
  hardLevel.textContent = '25x25';
  chooseLevel.appendChild(hardLevel);

  let bombs = document.createElement('input');
  bombs.className = 'settings__bombs';

  bombs.type = 'number';
  bombs.id = 'bombs-input';

  let bombsLabel = document.createElement('label');
  bombsLabel.textContent = `bombs\n(10 - 99):`;
  bombsLabel.setAttribute('for', 'bombs-input');

  bombs.min = 10;

  bombs.max = 99;

  bombs.value = 10; // Можете установить любое значение по умолчанию
  newGame.addEventListener('click', () => {
    document.querySelector('.field').remove();

    let level = chooseLevel.options.selectedIndex;
    let x = 10;
    if (level === 0) {
      x = 10;
    } else if (level === 1) {
      x = 15;
    } else if (level === 2) {
      x = 25;
    }

    if (bombs.value < 10) {
      let bombsCount = 10;
      bombs.value = 10;
    } else if (bombs.value > 99) {
      let bombsCount = 99;
      bombs.value = 99;
    }
    let bombsCount = bombs.value;

    a = new Minefield(x, x, bombsCount);
    a.addField();
  });

  let settingsBtn = document.createElement('button');
  settingsBtn.className = 'settings__btn';
  settingsBtn.textContent = 'dark theme';

  let settingGame = document.createElement('div');
  settingGame.className = 'settings';
  settingGame.append(
    newGame,
    levelLabel,
    chooseLevel,
    bombsLabel,
    bombs,
    settingsBtn
  );

  document.body.prepend(settingGame);

}
