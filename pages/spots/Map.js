import { useRef, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

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
          {spotName} - {pays}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

Map.defaultProps = {
  draggable: false,
  setPosition: undefined,
};

export default Map;
