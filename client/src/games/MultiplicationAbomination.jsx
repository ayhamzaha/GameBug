import { useState } from "react";
import ReactCountdownClock from "react-countdown-clock";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import useSound from "use-sound";
import correct from "../sounds/correctAns.mp3";
import incorrect from "../sounds/incorrectAns.mp3";

//STYLING
const multcontainer = {
  height: "600px",
  width: "800px",
  position: "relative",
};

const equation = {
  display: "grid",
  placeItems: "center",
  marginTop: "10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -100%)",
};

const scoreText = {
  display: "grid",
  position: "absolute",
  top: 0,
  right: 0,
  margin: "10px",
  fontStyle: "bold",
};

const userinputs = {
  margin: "29vh",
  display: "grid",
  justifyContent: "center",
  flexDirection: "column",
  gridTemplateRows: " 1fr 1fr",
  rowGap: "10px",
};

const clock = {
  margin: "20px",
};

const eqStyle = {
  fontWeight: "bold",
  fontSize: "300",
};

const resButt = {
  marginTop: "2vh",
  display: "grid",
};

const resetcontainer = {
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  gridTemplateRows: " 150px 50px",
  textAlign: "center",
  rowGap: "275px",
};

const MultGame = () => {
  const { authState } = useContext(AuthContext);

  const [playSound] = useSound(correct, { volume: 0.1 });
  const [play] = useSound(incorrect, { volume: 0.05 });

  const [timer, setTimer] = useState(true);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState(false);
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const [Num1, setNum1] = useState(getRandomNumber(1, 15));
  const [Num2, setNum2] = useState(getRandomNumber(1, 15));
  const [answer, setAnswer] = useState(null);

  function reStart() {
    window.location.reload();
  }

  function onSubmit(event) {
    event.preventDefault();
    if (answer !== null && parseInt(answer) === Num1 * Num2) {
      setScore(score + 1);
      playSound();
      setNum1(getRandomNumber(1, 15));
      setNum2(getRandomNumber(1, 15));
    } else {
      play();
    }
    setAnswer(""); // Clear the answer field after an answer
  }

  function stopGame() {
    setGameState(true);
    const data = {
      scores: score,
      gameTitle: "Multiplication Abomination",
      username: authState.username,
    };
    axios.post("http://localhost:3002/score", data).then((response) => {
      console.log("score recorded");
      console.log(response);
    });
  }
  return (
    <>
      {gameState ? (
        <div style={resetcontainer}>
          <div>
            <h1>Times Up!</h1>

            <h2>You scored {score} points!</h2>
          </div>
          <Button
            style={{ width: "300px", height: "50px", display: "inline-block" }}
            onClick={() => {
              reStart();
            }}
            variant="dark"
          >
            Play Again
          </Button>
        </div>
      ) : (
        <div style={multcontainer}>
          <div style={equation}>
            <h1 style={eqStyle}>
              {Num1} x {Num2}
            </h1>
          </div>
          <div style={scoreText}>
            <h1>Score: {score}</h1>
          </div>
          <div style={clock}>
            <ReactCountdownClock
              className="timer"
              seconds={60}
              alpha={0.9}
              size={100}
              paused={timer}
              onComplete={() => {
                stopGame();
              }}
            />
          </div>
          <div style={userinputs}>
            <form onSubmit={onSubmit} className="userForm">
              <input
                onClick={() => {
                  setTimer(false);
                }}
                id="userAnswer"
                type="number"
                placeholder="Click To Start"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer || ""}
              />
            </form>
            <div style={resButt}>
              <Button
                variant="dark"
                onClick={() => {
                  reStart();
                }}
                style={resButt}
              >
                Restart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MultGame;
