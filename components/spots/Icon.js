import L from "leaflet";
import locationMarker from "../images/svg/location.svg";

const Icon = new L.Icon({
  iconUrl: locationMarker,
  iconRetinaUrl: locationMarker,
  iconAnchor: [17, 46],
  iconSize: [35, 46],
  className: "leaflet-div-icon",
});

export { Icon };
