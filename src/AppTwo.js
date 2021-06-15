import './style.css';
import React, { useState, useEffect } from 'react';

let currentScore = 0;
const scores = [0, 0];
export default function App() {
  const [active, setActive] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [playing, setPlaying] = useState(true);

  const player0El = document.querySelector('.player--0');
  const player1El = document.querySelector('.player--1');
  const score0El = document.querySelector('#score--0');
  const score1El = document.getElementById('score--1');
  const current0El = document.getElementById('current--0');
  const current1El = document.getElementById('current--1');

  // useEffect(()=> {
  // const init = function(){
  //   scores = [0, 0]
  //   setActive(0);
  //     setPlaying(true);
  //     setImgSrc(null);
  //     currentScore = 0;
  //     score0El.textContent = 0;
  //     score1El.textContent = 0;
  //     current0El.textContent = 0;
  //     current1El.textContent = 0;
  //     player0El.classList.remove('player--winner');
  //     player1El.classList.remove('player--winner');
  //     player0El.classList.add('player--active');
  //     player1El.classList.remove('player--active');
  // }
  // init()
  // },[])

  const switchPlayer = function() {
    document.getElementById(`current--${active}`).textContent = 0;
    //setCurrentScore(0)
    currentScore = 0;
    setActive(active === 0 ? 1 : 0);
  };
  const rollingDice = function() {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      //console.log(dice);
      setImgSrc(`images/dice-${dice}.png`);
      if (dice !== 1) {
        currentScore += dice;
        document.getElementById(
          `current--${active}`
        ).textContent = currentScore;
        //setCurrentScore (currentScore + dice)
      } else {
        switchPlayer();
      }
    }
  };
  const holdTheDice = function() {
    if (playing) {
      scores[active] += currentScore;
      document.getElementById(`score--${active}`).textContent = scores[active];
      if (scores[active] >= 20) {
        setPlaying(false);
        setImgSrc(null);
        document
          .querySelector(`.player--${active}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${active}`)
          .classList.remove('player--active');
      } else {
        switchPlayer();
      }
    }
  };
  const newGame = function() {
    setActive(0);
    setPlaying(true);
    setImgSrc(null);
    currentScore = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    // scores=[0,0]
  };
  return (
    <div className="App">
      <div className="main">
        <div style={{ display: 'flex' }}>
          <div
            className={`player player--0 ${
              active === 0 ? 'player--active' : ''
            } `}
          >
            <h2 className="name" id="name--0">
              Player 1
            </h2>
            <p className="score" id="score--0">
              0
            </p>
            <div className="current">
              <p className="current-label">Current</p>
              <p className="current-score" id="current--0">
                0
              </p>
            </div>
          </div>
          <div
            className={`player player--1 ${
              active === 1 ? 'player--active' : ''
            } `}
          >
            {/* ${
              plyer1 >= 20 ? 'player--winner' : ''
            } */}
            <h2 className="name" id="name--1">
              Player 2
            </h2>
            <p className="score" id="score--1">
              0
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
        <button onClick={newGame} className="btn btn--new">
          🔄 New game
        </button>
        <button className="btn btn--roll" onClick={rollingDice}>
          🎲 Roll dice
        </button>
        <button onClick={holdTheDice} className="btn btn--hold">
          📥 Hold
        </button>
      </div>
    </div>
  );
}
