import React, { useState } from "react";

//default routes data
// import importedRoutes from "./routes-data/example-routes-single.json";
import importedRoutes from "./routes-data/example-routes-south-north.json";

//CSS
import "./styles.css";

import { parseAndValidate } from "./routeDataValidation";
import { RouteDataExplainer } from "./RouteDataExplainer";

import MyMap from "./MyMap";

export default function App() {

  const [routesText, setRoutesText] = useState(
    JSON.stringify(importedRoutes, null, 2)
  );

  function handleRoutesTextChange(e) {
    setRoutesText(e.target.value);
  }

  const [routesParsed, feedback] = parseAndValidate(routesText);

  return (
    <div className="App">
      <header>
        <h3>Simple flight-routes visualiser</h3>
      </header>

      {routesParsed && <MyMap routes={routesParsed} />}

      <h3>Paste your routes JSON here</h3>
      <textarea className={routesParsed ? "ok" : "bad"}
        placeholder={"Your routes JSON here"}
        value={routesText}
        onChange={handleRoutesTextChange}
        cols={60}
        rows={10}
      />

      <FeedbackList feedback={feedback} />

      <RouteDataExplainer />

      <Footer />
    </div >
  );
}

function FeedbackList({ feedback }) {
  if (feedback && feedback.length > 0) {
    return <>
      <h3>Problems:</h3>
      <ul className="feedback-list">
        {feedback.map((fb, ix) => <li key={ix}>{fb}</li>)}
      </ul></>
  } else {
    return null;
  }
}

function Footer() {
  return <footer>
    Made with react-leaflet v3.0.5.
        <a href="https://github.com/WeAreAcademy/mark-tool--flights-visualiser/">
      Source
        </a>
  </footer>
}