import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import navLogo from "../img/nav-logo_final.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

function NavigationBar() {
  const navTo = useNavigate();
  const { authState } = useContext(AuthContext);
  const { setAuthState } = useContext(AuthContext);
  const signOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false, access: "" });
  };
  return (
    <div className="navcntr" style={{ display: "block" }}>
      <Navbar
        expand="lg"
        className="bg-body-tertiary fixed-top"
        data-bs-theme="dark"
      >
        <div
          className="container-fluid"
          style={{
            margin: 0,
            width: "100%",
            columnGap: "12px",
          }}
        >
          <Image
            width="75px"
            style={{ marginRight: "12px", cursor: "pointer" }}
            src={navLogo}
            roundedCircle
            thumbnail
            onClick={() => navTo("/")}
          />
          <Navbar.Brand
            onClick={() => navTo("/")}
            style={{ fontSize: 32, cursor: "pointer" }}
          >
            GameBug
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {authState.status ? (
                <>
                  <Nav.Link
                    onClick={() => {
                      navTo(`/profile/${authState.username}`);
                    }}
                    style={{ fontSize: 18, color: "white" }}
                  >
                    <b>{authState.username}</b>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      signOut();
                    }}
                    style={{ fontSize: 18, color: "white" }}
                  >
                    Sign Out
                  </Nav.Link>

                  {authState.access === "Admin" ? (
                    <Nav.Link
                      onClick={() => {
                        navTo("/addgame");
                      }}
                      style={{ fontSize: 18, color: "white" }}
                    >
                      Add Game
                    </Nav.Link>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <Nav.Link
                  onClick={() => {
                    navTo("/signin");
                  }}
                  style={{ fontSize: 18, color: "white" }}
                >
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
