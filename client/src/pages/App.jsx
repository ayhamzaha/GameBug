import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../page-styling/App.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Profile from "./Profile";
import Home from "./Home";
import GameBackground from "../components/GameBackground";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import AddGame from "./AddGame";
import GameLeaderBoard from "./GameLeaderBoard";

const App = () => {
  const [listOfGames, setListOfGames] = useState([]);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    access: "",
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3002/games").then((response) => {
      setListOfGames(response.data);
    });

    axios
      .get("http://localhost:3002/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            access: response.data.access,
            status: true,
          });
        }
      });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/leaderboard/:gameTitle" element={<GameLeaderBoard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/addgame" element={<AddGame />} />
        {listOfGames.map((value, key) => {
          return (
            <Route
              key={key}
              path={value.tolink}
              element={
                <>
                  <GameBackground
                    title={value.gametitle}
                    gpath={value.gamefile}
                  ></GameBackground>
                </>
              }
            ></Route>
          );
        })}

        <Route path="*" element={<Home />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
