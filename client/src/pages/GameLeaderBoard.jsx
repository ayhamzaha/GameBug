import LeaderBoardGlobal from "../components/LeaderBoardGlobal";
import NavigationBar from "../components/NavigationBar";

const GameLeaderBoard = () => {
  return (
    <div className="main-container-2">
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
        <div>
          <LeaderBoardGlobal />
        </div>
      </div>
    </div>
  );
};

export default GameLeaderBoard;
