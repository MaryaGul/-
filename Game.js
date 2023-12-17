import React, { useContext, useState } from 'react';
import { Context } from "../index";
import Square from '../components/Square';
import '../css/GameComponents.css';
import { createGame } from '../http/userAPI';
import { calculateWinner, getNextStep } from './GameUtils';

const Game = () => {
  const { user } = useContext(Context);
  const [board, setBoard] = useState(Array(25).fill(null));
  const [countStep, setCount] = useState(0);
  const winner = calculateWinner(board);

  const buttonClick = (index) => {
    const boardCopy = [...board];
    let step = 0;

    if (winner || boardCopy[index]) return; // Если победитель уже определен или клетка занята, ничего не делаем

    if (index >= 20 || boardCopy[index + 5] !== null) {
        // Если выбрана клетка на самой нижней линии или над клеткой уже есть фишка
        boardCopy[index] = 'x';
        step++;
    } else if (index > 4 && boardCopy[index] === null && (boardCopy[index - 5] !== null || boardCopy[index + 5] !== null)) {
        // Если клетка на верхней линии и под текущей клеткой есть фишка
        boardCopy[index] = 'x';
        step++;
    }

    const tmpWinner = calculateWinner(boardCopy);

    // Добавлено условие для избежания пропуска хода
    if (tmpWinner === null && countStep < 19 && boardCopy[index] === 'x') {
        index = getNextStep(boardCopy);
        boardCopy[index] = 'o';
        step++;
    }

    setCount(countStep + step);
    setBoard(boardCopy);

    // Проверка на конец игры для записи в таблицу
    const lastTmpWinner = calculateWinner(boardCopy);
    if (lastTmpWinner !== null || countStep >= 19) {
        try {
            let isWinner = lastTmpWinner === 'x' ? true : false;
            let time = Math.floor(Math.random() * (30 - 2 + 1)) + 2; // Генерация случайного времени
            let data = createGame(isWinner, time, user.id);
            // this.updateGames() // Заменил на ваш метод обновления игр
        } catch (e) {
            alert(e.response.data.message);
        }
    }
};

  
  
  
  

  const startNewGame = () => {
    setBoard(Array(25).fill(null));
    setCount(0);
  };

  return (
    <div className='black_back'>
      <button
        variant={"outline-light"}
        className="start__btn"
        onClick={() => startNewGame()}>4 В РЯД!</button>
      <div className="board">
        {board.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => buttonClick(i)} />
        ))}
      </div>
      <div className='game__info'>
        {winner ? "[ WIN " + winner + " ! ]" :
          (countStep === 20) ? "[ DRAW ! ]" : "[ YOU TURN ]"}
      </div>
    </div>
  );
};

export default Game;
