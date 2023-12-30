import NavigationBar from "../components/NavigationBar";
import GameCard from "../components/GameCard";
import "../page-styling/App.css";

const Home = () => {
  return (
    <div className="main-container">
      <NavigationBar />
      <GameCard />
    </div>
  );
};

export default Home;

//CODE FOR FOOTER MIGHT USE MIGHT NOT
/*    <footer className="footer-container">
        <div style={{ height: "100px" }}>
          <h5
            style={{
              textAlign: "center",
              height: "100%",
              paddingTop: "1%",
              margin: "0",
            }}
          >
            <small>THIS IS A FOOTER</small>
          </h5>
        </div>
      </footer>
*/
