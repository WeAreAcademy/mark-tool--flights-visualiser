import React from "react";

export function RouteDataExplainer() {
  const formatNotes = [
    "Your route data must be valid JSON",
    "It must be an array of objects",
    "Each object must have the following fields: ",
    [
      "flight_no",
      "departure_city",
      "arrival_city",
      "departure_coordinates - an object with x, y properties (a postgres Point)",
      "arrival_coordinates - an object with x, y properties (a postgres Point)"
    ]
  ];

  return (
    <div className="route-data-explainer">
      <h3>Expected route data format</h3>
      <Lister notes={formatNotes} />
      TODO: show example
    </div>
  );
}

function Lister({ notes }) {
  return (
    <ul>
      {notes.map((note, ix) =>
        typeof note === "object" ? (
          <Lister key={ix} notes={note} />
        ) : (
          <li key={ix}>{note}</li>
        )
      )}
    </ul>
  );
}
