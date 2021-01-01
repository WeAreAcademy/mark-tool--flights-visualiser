import React from "react";
import { Tooltip } from "react-leaflet";
import { coordsToLatLngStr } from "./App";

export function AirportTooltip({ routeDetail: rd, index, isArrival }) {
  function markupCity(city, coords, fancy) {
    return fancy ? (
      <>
        <strong>{city} </strong>
        {coordsToLatLngStr(coords)}
      </>
    ) : (
        city
      );
  }

  return (
    <Tooltip>
      #{index + 1}: Flight {rd.flight_no}
      <br /> From:{" "}
      {markupCity(rd.departure_city, rd.departure_coordinates, !isArrival)}
      <br /> To:{" "}
      {markupCity(rd.arrival_city, rd.arrival_coordinates, isArrival)}
      <br /> Displacement:{" "}
      <Displacement
        from={rd.departure_coordinates}
        to={rd.arrival_coordinates} />
    </Tooltip>
  );
}
function Displacement({ from, to }) {
  return (
    <>
      <br />
      {Math.round(to.y - from.y)} degrees North
      <br />
      {Math.round(to.x - from.x)} degrees East
    </>
  );
}
