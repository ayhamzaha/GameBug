import { useContext } from "react";
import NavigationBar from "../components/NavigationBar";
import "../page-styling/Profile.css";
import { AuthContext } from "../helpers/AuthContext";
import LeaderBoard from "../components/LeaderBoard";
import NotSignedIn from "./NotSignedIn";

const Profile = () => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.status ? (
        <div className="main-container">
          <NavigationBar />
          <div
            style={{
              display: "flex",
              verticalAlign: "center",
              overflow: "hidden",
              padding: "15vh 0",
              justifyContent: "center",
            }}
          >
            <div className="profile-container-3">
              <h1
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                {authState.username}
              </h1>
              <div style={{ justifyContent: "left" }}>
                <h3 className="emailText">User ID: {authState.id}</h3>
                <h3 className="emailText">Account Type: {authState.access}</h3>
              </div>
              <div
                className="game-stats"
                style={{ maxHeight: "600px", marginTop: "30px" }}
              >
                <h3
                  style={{ margin: 0, textAlign: "center", fontWeight: "bold" }}
                >
                  Game History
                </h3>
                <div
                  style={{
                    maxHeight: "350px",
                    overflowY: "scroll",
                  }}
                >
                  <LeaderBoard />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotSignedIn />
      )}
    </>
  );
};

export default Profile;
