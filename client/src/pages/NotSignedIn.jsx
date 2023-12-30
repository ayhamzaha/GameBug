import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const NotSignedIn = () => {
  const navTo = useNavigate();

  return (
    <div className="main-container-2">
      <div
        style={{
          display: "flex",
          verticalAlign: "center",
          overflow: "hidden",
          padding: "15vh 0",
          justifyContent: "center",
        }}
      >
        <div className="profile-container-2">
          <h1 className="signin">You are not currently signed in</h1>
          <p>
            To access this page you must sign in to your account or create an
            account.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
          >
            <Button
              onClick={() => {
                navTo("/signin");
              }}
            >
              Sign in here
            </Button>
            <Button
              onClick={() => {
                navTo("/signup");
              }}
            >
              Sign up here
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotSignedIn;
