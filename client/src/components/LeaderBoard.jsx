import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const LeaderBoard = () => {
  const [gameScoreList, setGameScoreList] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/scores/${authState.username}`)
      .then((response) => {
        setGameScoreList(response.data);
      });
  }, [authState.username]);
  return (
    <div style={{}}>
      <Table
        striped
        bordered
        size="lg"
        variant="dark"
        style={{ width: "750px", margin: "0", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th colSpan={2}>Game Title</th>
            <th colSpan={2}>Score</th>
            <th colSpan={2}>Date</th>
          </tr>
        </thead>
        <tbody>
          {gameScoreList.map((value, key) => {
            return (
              <tr key={key}>
                <td colSpan={2}>{value.gameTitle}</td>
                <td colSpan={2}>{value.scores}</td>
                <td colSpan={2}>
                  {new Date(value.createdAt)
                    .toISOString()
                    .replace(/T/, " ")
                    .substring(0, 19)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default LeaderBoard;
