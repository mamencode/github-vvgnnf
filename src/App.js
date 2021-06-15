import './style.css';
import React, { useState } from 'react';

export default function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [dice, setDice] = useState(null);
  const [active, setActive] = useState(0);
  const [current1, setCurrent1] = useState(0);
  const [plyer0, setPlyer0] = useState(0);
  const [plyer1, setPlyer1] = useState(0);
  const [current0, setCurrent0] = useState(0);
  const [game, setGame] = useState(true);
  const [current, setCurrent] = useState(0);

  const scores = [0, 0];

  const rollingDice = function() {
    const _dice = Math.trunc(Math.random() * 6) + 1;
    console.log(_dice);
    
    if (_dice !== 1) {
      setCurrent(current + _dice);
      document.getElementById(`current--${active}`).textContent = current;

      setImgSrc(`images/dice-${_dice}.png`);
    } else {
      document.getElementById(`current--${active}`).textContent = 0
      setCurrent(0);
      setActive(active === 0 ? 1 : 0);
      
    }
  };
  const rollDice = function() {
    if (game) {
      const _dice = Math.trunc(Math.random() * 6) + 1;
      //console.log(_dice);
      setImgSrc(`images/dice-${_dice}.png`);
      if (_dice !== 1) {
        active === 0
          ? setCurrent0(current0 + _dice)
          : setCurrent1(current1 + _dice);
      } else {
        setActive(active === 0 ? 1 : 0);
        setCurrent1(0);
        setCurrent0(0);
      }
    }
  };
  const holdTheDice = function() {};

  const holdDice = function() {
    if (game) {
      if (plyer1 >= 20 && plyer1 > plyer0) {
        setGame(false);
        console.log(game);
        setImgSrc(null);
        console.log('null src');
      } else if (plyer0 >= 20 && plyer0 > plyer1) {
        setGame(false);
        console.log(game);
        setImgSrc(null);
        console.log('null src');
      } else {
        active === 0
          ? setPlyer0(plyer0 + current0)
          : setPlyer1(plyer1 + current1);
        setActive(active === 0 ? 1 : 0);
        setCurrent1(0);
        setCurrent0(0);
      }
    }

    // active===0 && plyer0<=20? setPlyer0(plyer0 +current0): plyer1<=20? setPlyer1(plyer1 + current1): console.log("this")

    //active===0 ? setPlyer0(plyer0 +current0): setPlyer1(plyer1 + current1)
  };

  return (
    <div className="App">
      <div className="main">
        <div style={{ display: 'flex' }}>
          <div
            className={`player ${active === 0 ? 'player--active' : ''} ${
              plyer0 >= 20 ? 'player--winner' : ''
            }`}
          >
            <h2 className="name" id="name--0">
              Player 1
            </h2>
            <p className="score" id="score--0">
              {plyer0}
            </p>
            <div className="current">
              <p className="current-label">Current</p>
              <p className="current-score" id="current--0">
                0
              </p>
            </div>
          </div>
          <div
            className={`player ${active === 1 ? 'player--active' : ''} ${
              plyer1 >= 20 ? 'player--winner' : ''
            }`}
          >
            <h2 className="name" id="name--1">
              Player 2
            </h2>
            <p className="score" id="score--1">
              {plyer1}
            </p>
            <div className="current">
              <p className="current-label">Current</p>
              <p className="current-score" id="current--1">
                0
              </p>
            </div>
          </div>
        </div>
        <img className="dice" src={imgSrc} alt="" />
        <button className="btn btn--new">🔄 New game</button>
        <button
          disabled={!game}
          className="btn btn--roll"
          onClick={rollingDice}
        >
          🎲 Roll dice
        </button>
        <button onClick={holdTheDice} className="btn btn--hold">
          📥 Hold
        </button>
      </div>
    </div>
  );
}
