import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import colourForIndex from "./colours";
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

function convertCoords(pgPoint) { return [pgPoint.y, pgPoint.x] };


export default function MyMap({ routes }) {
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
