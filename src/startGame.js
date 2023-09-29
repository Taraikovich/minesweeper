import { generateEmptyMatrix, generateMatrix } from './generateMatrix';
import sweepAudio from './images/sweep.wav';
import winAudio from './images/win.wav';
import loseAudio from './images/lose.wav';

let sweep = new Audio(sweepAudio);
let win = new Audio(winAudio);
let lose = new Audio(loseAudio);

export class Minefield {
  constructor(x = 10, y = 10, b = 10) {
    this.x = x;
    this.y = y;
    this.bombs = b;
    this.matrix = generateEmptyMatrix(x, y);

    this.gameBegin = false;

    this.field = document.createElement('div');
    this.field.className = 'field';
    this.field.classList.add(`field_${x}`);

    this.matrix.forEach((y, i) => {
      this.row = document.createElement('div');
      this.row.className = 'field__row';
      this.row.setAttribute('data-row', i);
      this.field.append(this.row);
      y.forEach((x, j) => {
        this.cell = document.createElement('div');
        this.cell.className = 'field__cell';

        this.cell.setAttribute('value', x);
        this.cell.setAttribute('data-col', j);
        this.cell.addEventListener('click', this.startGame.bind(this));
        this.cell.addEventListener('click', this.openCell.bind(this));

        this.cell.addEventListener('click', this.gameOver.bind(this));
        this.cell.addEventListener('contextmenu', this.rightClick.bind(this));
        this.row.append(this.cell);
      });
    });

    this.info = document.createElement('div');
    this.info.className = 'info';

    this.seconds = document.createElement('div');
    this.seconds.className = 'info__seconds';
    this.seconds.textContent = '0';

    this.info.append(this.seconds);

    this.countMovies = document.createElement('div');
    this.countMovies.className = 'info__movies';
    this.countMovies.textContent = `1`;
    this.info.append(this.countMovies);

    this.countFlags = document.createElement('div');
    this.countFlags.className = 'info__flags';
    this.countFlags.textContent = '0';
    this.info.append(this.countFlags);

    this.countMines = document.createElement('div');
    this.countMines.className = 'info__mines';
    this.countMines.textContent = `0/${this.bombs}`;
    this.info.append(this.countMines);

    this.muteBtn = document.createElement('button');
    this.muteBtn.className = 'muteBtn';
    this.muteBtn.textContent = 'mute sounds';
    this.muteBtn.addEventListener('click', this.mute.bind(this));
    this.notMuted = true;
    this.field.append(this.muteBtn);

    this.field.append(this.info);

    this.resultList = document.createElement('ul');
    this.resultList.textContent = "Last 10 results:"
    this.resultList.className = 'field__results';
    for (let i = 0; i < 10; i++) {
      this.resultListItem = document.createElement('li');
      if (localStorage.getItem('lastResults') !== null) {
        let result = localStorage.getItem('lastResults').split(',');
        if (result[i]) {
          this.resultListItem.textContent = result[i];
          this.resultList.append(this.resultListItem);
        } else {
          this.resultListItem.textContent = '-';
          this.resultList.append(this.resultListItem);
        }
      } else {
        this.resultListItem.textContent = '-';
        this.resultList.append(this.resultListItem);
      }
    }

    this.field.append(this.resultList);
  }

  mute() {
    this.notMuted = !this.notMuted;
    if (this.notMuted) {
      this.muteBtn.textContent = 'mute sounds';
    } else {
      this.muteBtn.textContent = 'unmute sounds';
    }
  }

  timer() {
    let timeNow = new Date();
    return Math.round((timeNow - this.startTime) / 1000) + '';
  }

  addField() {
    document.body.append(this.field);
    // this.cell.style.fontSize = `${this.cell.offsetWidth * 0.5}px`;
  }

  openCell(e) {
    if (this.notMuted) sweep.play();
    if (!e.target.classList.contains('field__cell_flag')) {
      e.target.textContent = e.target.getAttribute('value');
      e.target.classList.add('field__cell_open');
      e.target.classList.add(`field__cell_${e.target.getAttribute('value')}`);
      if (e.target.getAttribute('value') === '⚙') {
        e.target.classList.add('field__cell_bomb');
      }

      if (e.target.textContent === '0') {
        e.target.classList.add('field__cell_null');
        const rowIndex = parseInt(e.target.parentNode.getAttribute('data-row'));
        const colIndex = parseInt(e.target.getAttribute('data-col'));
        this.openNeighbors(rowIndex, colIndex);
      }
    }
  }

  openNeighbors(row, col) {
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        const neighborCell = document.querySelector(
          `[data-row="${i}"] [data-col="${j}"]`
        );
        if (
          neighborCell &&
          neighborCell.getAttribute('value') === '0' &&
          neighborCell.textContent === ''
        ) {
          neighborCell.textContent = neighborCell.getAttribute('value');
          neighborCell.classList.add('field__cell_open');
          neighborCell.classList.add(
            `field__cell_${neighborCell.getAttribute('value')}`
          );
          this.openNeighbors(i, j);
        } else if (
          neighborCell &&
          neighborCell.getAttribute('value') !== '0' &&
          neighborCell.textContent === ''
        ) {
          neighborCell.textContent = neighborCell.getAttribute('value');
          neighborCell.classList.add('field__cell_open');
          neighborCell.classList.add(
            `field__cell_${neighborCell.getAttribute('value')}`
          );
        }
      }
    }
  }

  startGame(e) {
    if (!this.gameBegin) {
      this.matrix = generateMatrix(
        e.target.getAttribute('value') * 1,
        this.x,
        this.y,
        this.bombs
      );

      document.querySelectorAll('.field__cell').forEach((cell, index) => {
        cell.setAttribute('value', `${this.matrix.flat()[index]}`);
      });

      this.startTime = new Date();
      this.secCount = setInterval(() => {
        this.seconds.textContent = this.timer();
      }, 1000);
      this.moves = 0;
      this.flagsCount = 0;
      this.gameBegin = true;
    }
  }

  rightClick(e) {
    e.preventDefault();
    if (
      e.target.innerText === '' &&
      !e.target.classList.contains('field__cell_flag')
    ) {
      e.target.classList.add('field__cell_flag');
      this.flagsCount += 1;
    } else if (e.target.classList.contains('field__cell_flag')) {
      e.target.classList.remove('field__cell_flag');
      this.flagsCount === 0 ? this.flagsCount : (this.flagsCount -= 1);
    }
    this.countFlags.textContent = this.flagsCount;
    this.countMines.textContent = `${
      this.flagsCount <= this.bombs ? this.flagsCount : this.bombs
    }/${this.bombs}`;
  }

  showMines() {
    if (this.result === 'lose') {
      document.querySelectorAll('[value="⚙"]').forEach((cell) => {
        cell.textContent = cell.getAttribute('value');
        cell.classList.remove('field__cell_flag');
        cell.classList.add('field__cell_bomb');
      });
    }
  }

  gameOver(e) {
    let time = new Date();
    this.endTime = time - this.startTime;

    if (e.isTrusted === true) {
      this.moves += 1;
      this.countMovies.textContent = `${this.moves}`;
    }

    let block = document.createElement('div');
    block.className = 'field__block';
    block.style.height = `${this.field.offsetHeight}px`;
    block.style.width = `${this.field.offsetWidth}px`;
    let loseText = document.createElement('p');
    loseText.className = 'field__text';
    if (document.body.classList.contains('dark'))
      loseText.classList.add('field__text_dark');

    let closedCell = 0;
    document.querySelectorAll('.field__cell').forEach((cell) => {
      if (cell.textContent === '' || cell.textContent === '⚑') {
        closedCell += 1;
      }

      if (cell.textContent === '⚙') {
        this.result = 'lose';
        this.field.append(block);
        block.append(loseText);
        loseText.textContent = 'Game over. Try again';
        clearInterval(this.secCount);
        if (this.notMuted) lose.play();
      }
    });
    this.showMines();

    if (closedCell === this.bombs * 1) {
      this.field.append(block);
      block.append(loseText);
      loseText.textContent = `Hooray! You found all mines in ${Math.round(
        this.endTime / 1000
      )} seconds and ${this.moves} moves!`;
      clearInterval(this.secCount);
      this.seconds.textContent = Math.round(this.endTime / 1000);
      if (this.notMuted) win.play();

      if (localStorage.getItem('lastResults') !== null) {
        // Ключ существует в Local Storage
        let result = `${Math.round(this.endTime / 1000)} seconds and ${
          this.moves
        } moves!`;
        localStorage.setItem(
          'lastResults',
          `${result},${localStorage.getItem('lastResults')}`
        );
      } else {
        // Ключ не существует в Local Storage
        let result = `${Math.round(this.endTime / 1000)} seconds and ${
          this.moves
        } moves!`;
        localStorage.setItem('lastResults', result);
      }
    }
  }
}
