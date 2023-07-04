import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import Die from "./die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(getNewDiceArray());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function newGame(){
    setDice(getNewDiceArray());
    setTenzies(false);
  }

  function getNewDiceArray() {
    const diceNumArray = [];
    for (let i = 0; i < 10; i++) {
      diceNumArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceNumArray;
  }

  function handleRoll() {
    setDice((oldDie) =>
      oldDie.map((die) => {
        if (die.isHeld) {
          return die;
        } else {
          return {
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid(),
          };
        }
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceArray = dice.map((die) => (
    <Die key={die.id} die={die} holdDice={() => holdDice(die.id)} />
  ));
  return (
    <main className="container">
      {tenzies && <Confetti />}
      <h2 className="tenzies">Tenzies</h2>
      <p className="instructions">
        Roll until all dice are the same. Click each dice to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceArray}</div>
      {tenzies ? (
        <button className="roll-button" onClick={newGame}>
          New Game
        </button>
      ) : (
        <button className="roll-button" onClick={handleRoll}>
          Roll
        </button>
      )}
    </main>
  );
}

export default App;
