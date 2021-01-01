import React, { useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import colourForIndex from "./colours";
//default routes data
// import importedRoutes from "./routes-data/example-routes-single.json";
import importedRoutes from "./routes-data/example-routes-south-north.json";
//CSS
import "./styles.css";
import { RouteDataExplainer } from "./RouteDataExplainer";
import { AirportTooltip } from "./AirportTooltip";
//Adding the following CSS import hides the map entirely by default (because the MapContainer will have 0 height)
// and messes up the image import path
// It seems better to load the css from CDN
//So, don't do this:
//import "leaflet/dist/leaflet.css";

//https://github.com/PaulLeCam/react-leaflet/issues/808#issuecomment-747719927
//https://leafletjs.com/reference-1.7.1.html#icon
const ICON_DEP = icon({
  iconUrl: "/images/marker-icon-2x-white.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41]
});
const ICON_ARR = icon({
  iconUrl: "/images/marker-icon-2x-gray.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41]
});

export default function App() {
  const [routesText, setRoutesText] = useState(
    JSON.stringify(importedRoutes, null, 2)
  );
  function handleRoutesTextChange(e) {
    setRoutesText(e.target.value);
  }
  const parsedRoutes = JSON.parse(routesText);

  return (
    <div className="App">
      <header>
        <h3>Flights</h3>
      </header>

      {parsedRoutes && parsedRoutes.length > 0 && (
        <MyMap routes={parsedRoutes} />
      )}
      <h3>Paste your routes JSON here</h3>
      <textarea
        placeholder={"Your routes JSON here"}
        value={routesText}
        onChange={handleRoutesTextChange}
        cols={60}
        rows={10}
      />
      <RouteDataExplainer />
      <footer>
        Made with react-leaflet v3.0.5.
        <a href="https://codesandbox.io/s/react-leaflet-305-flights-0nllg">
          Source
        </a>
      </footer>
    </div>
  );
}

const convertCoords = (pgPoint) => [pgPoint.y, pgPoint.x];
export const coordsToLatLngStr = (pgPoint) =>
  `(${pgPoint.y.toFixed(2)}, ${pgPoint.x.toFixed(2)})`;

function MyMap({ routes }) {
  return (
    <div>
      <MapContainer center={[50, 100]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {routes.map((item, ix) => (
          <div key={ix}>
            <Marker
              icon={ICON_DEP}
              position={convertCoords(item.departure_coordinates)}
            >
              <AirportTooltip
                routeDetail={item}
                index={ix}
                isArrival={false}
              ></AirportTooltip>
            </Marker>
            <Marker
              icon={ICON_ARR}
              position={convertCoords(item.arrival_coordinates)}
            >
              <AirportTooltip
                routeDetail={item}
                index={ix}
                isArrival={true}
              ></AirportTooltip>
            </Marker>
            <Polyline
              pathOptions={{
                color: colourForIndex(ix),
                opacity: 0.4
              }}
              positions={[
                convertCoords(item.departure_coordinates),
                convertCoords(item.arrival_coordinates)
              ]}
            />
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
