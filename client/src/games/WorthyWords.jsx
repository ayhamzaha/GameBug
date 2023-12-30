import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { generate } from "random-words";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import useSound from "use-sound";
import correct from "../sounds/correctAns.mp3";
import incorrect from "../sounds/incorrectAns.mp3";
import propTypes from "prop-types";

const WordGame = (props) => {
  const { authState } = useContext(AuthContext);
  const [randomWord, setRandomWord] = useState("");
  const [seenWords, setSeenWords] = useState([]);
  const [playSound] = useSound(correct, { volume: 0.25 });
  const [play] = useSound(incorrect, { volume: 0.05 });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  WordGame.propTypes = {
    title: propTypes.string,
  };

  useEffect(() => {
    if (lives <= 0) {
      console.log("Game is over!");
      gameOver();
    }
    getRandomWord();
  }, [lives]); // Run once on component mount

  // This function creates a random number between 0 and initialWords.length
  // and sets it as index, then whatever word is at the index of initialWords
  // array is chosen
  const getRandomWord = () => {
    let index = Math.random();
    let selectedWord = "test";
    if (index <= 0.6 || seenWords.length === 0 || seenWords.length < 3) {
      selectedWord = generate();
    } else {
      selectedWord = seenWords[Math.floor(Math.random() * seenWords.length)];
    }
    if (selectedWord === undefined) {
      selectedWord = seenWords.find(
        Math.floor(Math.random() * seenWords.length)
      );
    }

    setRandomWord(selectedWord);
  };

  const gameOver = () => {
    const data = {
      scores: score,
      gameTitle: props.title,
      username: authState.username,
    };
    axios.post("http://localhost:3002/score", data).then((response) => {
      console.log("score recorded");
      console.log(response);
    });
  };

  return (
    <div className="Main Container">
      {lives > 0 ? (
        <>
          <div>
            <h2>Score: {score}</h2>
            <h2>Lives: {lives}</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "75px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ paddingTop: "35px", fontSize: "65px" }}>
              {randomWord}
            </h1>
            <div>
              <Button
                variant="success"
                style={{ width: "150px", height: "50px", marginRight: "7px" }}
                onClick={() => {
                  if (seenWords.includes(randomWord)) {
                    setScore(score + 1);

                    playSound();
                  } else {
                    play();
                    setLives(lives - 1);
                  }
                  if (!seenWords.includes(randomWord)) {
                    setSeenWords([...seenWords, randomWord]);
                  }
                  getRandomWord();
                }}
              >
                Seen
              </Button>
              <Button
                variant="danger"
                style={{ width: "150px", height: "50px", marginLeft: "7px" }}
                onClick={() => {
                  if (seenWords.includes(randomWord)) {
                    setLives(lives - 1);

                    play();
                  } else {
                    // The word has not been seen, award a point
                    setScore(score + 1);

                    playSound();
                    // Add the word to seenWords
                  }
                  if (!seenWords.includes(randomWord)) {
                    setSeenWords([...seenWords, randomWord]);
                  }
                  getRandomWord();
                }}
              >
                New
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "75px",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "110px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Game Over!</h1>
            <h2>You scored {score} points!</h2>
          </div>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
            style={{ width: "150px", height: "50px", marginLeft: "7px" }}
          >
            Restart
          </Button>
        </div>
      )}
    </div>
  );
};

export default WordGame;
