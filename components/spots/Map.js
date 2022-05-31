//https://gis.stackexchange.com/questions/415192/circle-with-direction-pointer-in-leaflet
import { useRef, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import pin from "/public/assets/svg/location.svg"

const limeOptions = { color: 'red' }
const multiPolyline = [
  [
    [51.5, -0.03895685336737648],
    [51.5, -0.03895685336737648]
  ],
  [
    [51.5, -0.1],
    [127.88780561089992, -0.03895685336737648]
  ],
]


// const origin_point = [51.5, 0.1]

// const sin = Math.sin(51.5)
// const sin2 = sin * Math.PI/180
// console.log(sin2)
// const cos = Math.cos(-0.01)
// const cos2 = cos * Math.PI/180
// console.log(cos2)

var SunCalc = require('suncalc');
var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
var sunrisePos = SunCalc.getPosition(times.sunrise, 51.5, -0.1);
console.log(sunrisePos)
var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

console.log(sunriseAzimuth)
console.log(degrees_to_radians(sunrisePos.azimuth));
// // var latlng = L.latLng(50.5, 30.5);
// const wrap = wrapLatLng.latLng(50.5, 30.5)
// console.log(latlng)
// console.log(wrap)

const Map = ({
  position,
  setPosition,
  zoom,
  minZoom,
  spotName,
  pays,
  draggable,
}) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );


  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      minZoom={minZoom}
      className="rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright"%3EOpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        draggable={draggable}
        animate={true}
        eventHandlers={draggable ? eventHandlers : undefined}
        ref={markerRef}
      >
        <Popup>
          <div className="text-center font-semibold">{spotName} <br /> {pays}</div>
        </Popup>

        {/* <Polyline pathOptions={limeOptions} positions={multiPolyline} /> */}
      </Marker>
    </MapContainer>
  );
};

Map.defaultProps = {
  draggable: false,
  setPosition: undefined,
};

export default Map;
