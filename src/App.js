import React, { useState } from "react";
//default routes data
// import importedRoutes from "./routes-data/example-routes-single.json";
import importedRoutes from "./routes-data/example-routes-south-north.json";
//CSS
import "./styles.css";

import { RouteDataExplainer } from "./RouteDataExplainer";
import MyMap from "./MyMap";

export default function App() {
  const [routesText, setRoutesText] = useState(
    JSON.stringify(importedRoutes, null, 2)
  );
  function handleRoutesTextChange(e) {
    setRoutesText(e.target.value);
  }

  let parsedRoutes;
  let jsonIsOk;
  try {
    parsedRoutes = JSON.parse(routesText);
    jsonIsOk = true;
  } catch (e) {
    parsedRoutes = null;
    jsonIsOk = false;
  }

  return (
    <div className="App">
      <header>
        <h3>Simple flight-routes visualiser</h3>
      </header>

      {parsedRoutes && parsedRoutes.length > 0 && (
        <MyMap routes={parsedRoutes} />
      )}
      <h3>Paste your routes JSON here</h3>
      <textarea className={jsonIsOk ? "ok" : "bad"}
        placeholder={"Your routes JSON here"}
        value={routesText}
        onChange={handleRoutesTextChange}
        cols={60}
        rows={10}
      />
      <RouteDataExplainer />
      <footer>
        Made with react-leaflet v3.0.5.
        <a href="https://github.com/WeAreAcademy/mark-tool--flights-visualiser/">
          Source
        </a>
      </footer>
    </div>
  );
}
