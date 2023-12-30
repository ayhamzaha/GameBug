import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const AddGame = () => {
  const { authState } = useContext(AuthContext);
  const [fileData, setFileData] = useState();
  const [ffileData, setFFileData] = useState();
  const navTo = useNavigate();
  const initialValues = {
    gametitle: "",
    gameinfo: "",
    tolink: "",
  };

  const validationSchema = Yup.object().shape({
    gametitle: Yup.string().required("Game title is required!"),
    gameinfo: Yup.string().required("Game info is required!"),
    tolink: Yup.string().max(15).required("Routing path name is required!"),
  });

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };
  const ffileChangeHandler = (e) => {
    setFFileData(e.target.files[0]);
  };

  const onSubmit = (data) => {
    console.log(data);

    const ddata = new FormData();
    ddata.append("image", fileData);

    axios
      .post("http://localhost:3002/file/single", ddata)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const dddata = new FormData();
    dddata.append("game", ffileData);

    axios
      .post("http://localhost:3002/gamefile/game", dddata)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const rdata = {
      gametitle: data.gametitle,
      gameinfo: data.gameinfo,
      tolink: data.tolink,
      gameImage: fileData.name,
      gamefile: ffileData.name,
    };
    axios.post("http://localhost:3002/games", rdata).then((response) => {
      console.log("Game added");
      console.log(response.data);
      navTo("/");
      window.location.reload();
    });
  };

  return (
    <>
      {authState.access === "Admin" ? (
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
            <div className="profile-container-2">
              <div>
                <h4 className="signin" style={{ fontWeight: "bold" }}>
                  Create The Game Card
                </h4>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form className="form-size">
                  <label className="user_in">
                    <b>Game Title</b>
                  </label>
                  <ErrorMessage
                    name="gametitle"
                    className="error"
                    component="span"
                  />
                  <Field
                    className="inpField-2"
                    autoComplete="off"
                    name="gametitle"
                    placeholder="Enter Game Title"
                  />

                  <label className="user_in">
                    <b>Enter Game Info</b>
                  </label>
                  <ErrorMessage
                    name="gameinfo"
                    className="error"
                    component="span"
                  />
                  <Field
                    className="inpField-2"
                    autoComplete="off"
                    name="gameinfo"
                    placeholder="Enter Game Info"
                  />
                  <label className="user_in">
                    <b>Enter Routing Path Name</b>
                  </label>
                  <ErrorMessage
                    name="tolink"
                    className="error"
                    component="span"
                  />
                  <Field
                    className="inpField-2"
                    autoComplete="off"
                    name="tolink"
                    placeholder="Enter Routing Path Name"
                  />
                  <div style={{ display: "flex" }}>
                    <label>
                      <b>Enter Game Image (PNG,JPG,WEBP)</b>
                    </label>
                    <input type="file" onChange={fileChangeHandler} />
                  </div>
                  <div style={{ display: "flex", marginBottom: "25px" }}>
                    <label>
                      <b>Enter Game File (JSX,JS)</b>
                    </label>
                    <input type="file" onChange={ffileChangeHandler} />
                  </div>

                  <Button type="submit">Add Game</Button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-container">
          <h1>Error: User is not allowed!</h1>
          <Button
            onClick={() => {
              navTo("/");
            }}
          >
            Return to Home
          </Button>
        </div>
      )}
    </>
  );
};
export default AddGame;
