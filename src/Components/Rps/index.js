import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";

const choices = [
  { id: "rock", icon: "https://i.pinimg.com/474x/3a/9f/09/3a9f099658f1851f1c0731ed6b013be7.jpg", color: "bg-red-500" },
  { id: "paper", icon: "https://i.pinimg.com/736x/79/8e/1e/798e1e6a466be424e16b7681619615d2.jpg", color: "bg-blue-500" },
  { id: "scissors", icon: "https://i.pinimg.com/736x/08/c3/a4/08c3a44ea9858d473054d51e6b53330d.jpg", color: "bg-yellow-500" },
];

const RockPaperScissors = () => {
  const [score, setScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [TOMChoice, setTOMChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [gameState, setGameState] = useState("choosing");

  const determineWinner = (player, TOM) => {
    if (player === TOM) return "DRAW";
    if (
      (player === "rock" && TOM === "scissors") ||
      (player === "paper" && TOM === "rock") ||
      (player === "scissors" && TOM === "paper")
    ) {
      setScore((prev) => prev + 1);
      return "YOU WIN";
    }
    return "TOM WINS";
  };

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)].id;
    setTOMChoice(randomChoice);
    setGameState("result");
    setTimeout(() => {
      setResult(determineWinner(choice, randomChoice));
    }, 1000);
  };

  const playAgain = () => {
    setGameState("choosing");
    setPlayerChoice(null);
    setTOMChoice(null);
    setResult(null);
  };

  const ChoiceButton = ({ choice, onClick, disabled }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick && onClick(choice.id)}
      disabled={disabled}
      className="choice-button"
    >
      <img src={choice.icon} alt={choice.id} className="image" />
    </motion.button>
  );

  return (
    <div className="game-container">

        <div className="users-c">
            <div className="user">
            <img src="https://i.pinimg.com/474x/aa/b7/60/aab760d1d4e3fcbcdfa63018ce668d18.jpg" alt="user" className="image" />
            <h2>YOU</h2>
            </div>
            <h1>VS</h1>
            <div className="user">
            <img src="https://i.pinimg.com/474x/9f/65/97/9f65971f0d712d40eeb905ab83c1c845.jpg" alt="user" className="image" />
            <h2>TOM</h2>
            </div>
        </div>
      <div className="score-board">
        <h1 className="heading">ROCK PAPER SCISSORS</h1>
        <div className="score-box picked">
          <div>YOUR SCORE</div>
          <div className="score">{score}</div>
        </div>
      </div>

      <div className="game-area">
        {gameState === "choosing" ? (
          <div className="choices-grid">
            {choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                onClick={handleChoice}
                disabled={gameState !== "choosing"}
              />
            ))}
          </div>
        ) : (
          <div className="result-area">
            <div className="picks">
            <div className="picked">
              <p>YOU PICKED</p>
              <ChoiceButton
                choice={choices.find((c) => c.id === playerChoice)}
                disabled={true}
              />
            </div>
            <div className="picked">
              <p>TOM PICKED</p>
              <ChoiceButton
                choice={choices.find((c) => c.id === TOMChoice)}
                disabled={true}
              />
            </div>
            </div>
            {result && (
              <div className="result-message">
                <h2>{result}</h2>
                <button onClick={playAgain} className="play-again-button">
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissors;
