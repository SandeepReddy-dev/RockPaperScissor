import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";

const choices = [
  { id: "rock", icon: "/images/rock.png", color: "bg-red-500" },
  { id: "paper", icon: "/images/paper.png", color: "bg-blue-500" },
  { id: "scissors", icon: "/images/Scissor.png", color: "bg-yellow-500" },
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
            <img src="/images/jerry.png" alt="user" className="image" />
            <h2>YOU</h2>
            </div>
            <h1>VS</h1>
            <div className="user">
            <img src="/images/tom.png" alt="user" className="image" />
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
