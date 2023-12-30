import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

const LeaderBoardGlobal = () => {
  const [globalScoreList, setglobalScoreList] = useState([]);
  const { authState } = useContext(AuthContext);

  let { gameTitle } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3002/score/${gameTitle}`).then((response) => {
      setglobalScoreList(
        [...response.data].sort((a, b) => b.scores - a.scores)
      );
    });
  }, [gameTitle]);
  return (
    <div
      style={{
        width: "60vw",
        maxHeight: "75vh",
        textAlign: "center",
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px",
        overflowY: "scroll",
      }}
    >
      <h1
        style={{
          backgroundColor: "black",
          color: "white",
          margin: 0,
        }}
      >
        {gameTitle}
      </h1>
      <Table bordered size="sm" variant="dark" style={{ margin: "0" }}>
        <thead>
          <tr>
            <th colSpan={2}>Username</th>
            <th colSpan={2}>Score</th>
            <th colSpan={2}>Date</th>
          </tr>
        </thead>
        <tbody>
          {globalScoreList.map((value, key) => {
            return (
              <tr key={key}>
                {authState.username === value.username ? (
                  <>
                    <td
                      style={{ backgroundColor: "#dfbd69", color: "white" }}
                      colSpan={2}
                    >
                      {value.username}
                    </td>
                    <td
                      style={{ backgroundColor: "#dfbd69", color: "white" }}
                      colSpan={2}
                    >
                      {value.scores}
                    </td>
                    <td
                      style={{ backgroundColor: "#dfbd69", color: "white" }}
                      colSpan={2}
                    >
                      {new Date(value.createdAt)
                        .toISOString()
                        .replace(/T/, " ")
                        .substring(0, 16)}
                    </td>
                  </>
                ) : (
                  <>
                    <td colSpan={2}>{value.username}</td>
                    <td colSpan={2}>{value.scores}</td>
                    <td colSpan={2}>
                      {new Date(value.createdAt)
                        .toISOString()
                        .replace(/T/, " ")
                        .substring(0, 16)}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default LeaderBoardGlobal;
