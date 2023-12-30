import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function GameCard() {
  const navTo = useNavigate();
  const { authState } = useContext(AuthContext);

  const [listOfGames, setListOfGames] = useState([]);

  function removeGame(title) {
    axios.delete(`http://localhost:3002/gamedel/${title}`).then((response) => {
      console.log(response);
      console.log("Game was removed successfully!");
      window.location.reload();
    });
  }

  useEffect(() => {
    axios.get("http://localhost:3002/games").then((response) => {
      setListOfGames(response.data);
    });
  }, []);
  return (
    <>
      {authState.access === "Admin" ? (
        <div className="d-flex justify-content-around">
          <div className="cntr">
            {listOfGames.map((value, key) => {
              return (
                <Card bg="dark" border="dark" text="white" key={key}>
                  <Card.Img
                    variant="top"
                    style={{
                      height: "300px",
                      width: "532px",
                      objectFit: "fill",
                      objectPosition: "center",
                    }}
                    src={`../src/img/${value.gameImage}`}
                    alt="Error image not loaded!"
                    //src={"../src/img/horizon.webp"}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "26px",
                      }}
                    >
                      {value.gametitle}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontSize: "16px",
                        width: "500px",
                        height: "125px",
                        overflowY: "scroll",
                      }}
                    >
                      {value.gameinfo}
                    </Card.Text>
                    <Button
                      style={{
                        width: "150px",
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "6px",
                      }}
                      variant="light"
                      onClick={() => {
                        navTo(value.tolink);
                      }}
                    >
                      Play
                    </Button>
                    <Button
                      style={{
                        width: "150px",
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "6px",
                        marginLeft: "200px",
                      }}
                      variant="light"
                      onClick={() => {
                        navTo(`/leaderboard/${value.gametitle}`);
                      }}
                    >
                      Leaderboard
                    </Button>
                    <Button
                      style={{
                        display: "block",
                        height: "50px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                      variant="danger"
                      onClick={() => {
                        removeGame(value.gametitle);
                      }}
                    >
                      Delete Game
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-around">
          <div className="cntr">
            {listOfGames.map((value, key) => {
              return (
                <Card bg="dark" border="dark" text="white" key={key}>
                  <Card.Img
                    variant="top"
                    style={{
                      height: "300px",
                      width: "532px",
                      objectFit: "fill",
                      objectPosition: "center",
                    }}
                    src={`../src/img/${value.gameImage}`}
                    alt="Error image not loaded!"
                    //src={"../src/img/horizon.webp"}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "26px",
                      }}
                    >
                      {value.gametitle}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontSize: "16px",
                        width: "500px",
                        height: "125px",
                        overflowY: "scroll",
                      }}
                    >
                      {value.gameinfo}
                    </Card.Text>
                    <Button
                      style={{
                        width: "150px",
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "6px",
                      }}
                      variant="light"
                      onClick={() => {
                        navTo(value.tolink);
                      }}
                    >
                      Play
                    </Button>
                    <Button
                      style={{
                        width: "150px",
                        height: "50px",
                        textAlign: "center",
                        paddingTop: "6px",
                        marginLeft: "200px",
                      }}
                      variant="light"
                      onClick={() => {
                        navTo(`/leaderboard/${value.gametitle}`);
                      }}
                    >
                      Leaderboard
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default GameCard;
