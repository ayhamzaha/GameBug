import propTypes from "prop-types";
import NavigationBar from "./NavigationBar";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useEffect, useState } from "react";
import NotSignedIn from "../pages/NotSignedIn";

GameBackground.propTypes = {
  title: propTypes.string,
  gpath: propTypes.string,
};

function GameBackground(props) {
  const { authState } = useContext(AuthContext);

  const [dynamicComponents, setDynamicComponents] = useState();

  useEffect(() => {
    const importAndRenderComponents = async () => {
      const componentNames = [props.gpath];
      const components = await Promise.all(
        componentNames.map(async (componentName) => {
          const { default: Component } = await import(
            /* @vite-ignore */
            `../games/${componentName}`
          );
          return <Component key={componentName} title={props.title} />;
        })
      );

      setDynamicComponents(components);
    };

    importAndRenderComponents();
  }, [props.gpath]);

  return (
    <>
      {authState.status ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightblue",
            height: "110vh",
            flexDirection: "column",
          }}
        >
          <NavigationBar />
          <div style={{ paddingTop: "100px" }}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: 0,
                color: "white",
                textShadow: "0 0 10px rgb(0, 0, 0)",
                transition: "text-shadow 0.5s ease",
                fontWeight: "bold",
              }}
            >
              {props.title}
            </h1>

            <div
              style={{
                height: "600px",
                width: "800px",
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0px 0px 10px 5px white",
              }}
            >
              {dynamicComponents}
            </div>
          </div>
        </div>
      ) : (
        <NotSignedIn />
      )}
    </>
  );
}

export default GameBackground;
