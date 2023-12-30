import "../page-styling/SignInUpForm.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const SignIn = () => {
  const navTo = useNavigate();

  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const onSubmit = (data) => {
    const userData = { username: data.username, password: data.password };
    axios
      .post("http://localhost:3002/auth/signin", userData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          console.log("User signed in successfully");
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            access: response.data.access,
            status: true,
          });
          navTo("/");
        }
      });
  };
  return (
    <div className="log-border-2">
      <div className="log-container">
        <h1 className="signin">Sign In</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label className="user_in">
              <b>Username</b>
            </label>
            <ErrorMessage name="username" className="error" component="span" />
            <Field
              className="inpField"
              autoComplete="off"
              name="username"
              placeholder="Enter Username"
            />

            <label className="user_in">
              <b>Password</b>
            </label>
            <ErrorMessage name="password" className="error" component="span" />
            <Field
              className="inpField"
              autoComplete="off"
              name="password"
              placeholder="Enter Password"
              type="password"
            />
            <Button type="submit" className="signinbotton">
              Sign In
            </Button>
            <a
              className="attr"
              onClick={() => {
                navTo("/signup");
              }}
            >
              Don&#39;t have an account? Sign up now!
            </a>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
