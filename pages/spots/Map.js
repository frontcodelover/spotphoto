import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
const Map = ({ position, zoom, minZoom, spotName, pays }) => {
    console.log(position)
    return (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }} minZoom={minZoom}>
            <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;%3EOpenStreetMap</a> contributors"
  />
        <Marker 
        position={position}
        draggable={true}
        animate={true}
        >
          <Popup>
            {spotName} - {pays}
          </Popup>
        </Marker>
      </MapContainer>
    )
  }
  
  export default Map