import { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapAddSpot({ position, setPosition }) {
  const [draggable, setDraggable] = useState(true);
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

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  function draggableMarkerExample(position, setPosition) {
    return (
      <MapContainer center={position} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright"%3EOpenStreetMap</a> contributors'
        />
        {/* <DraggableMarker position={position} setPosition={setPosition} /> */}
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? "Déplacez le marqueur sur le lieu de la photo"
                : "Cliquez ici pour bouger le marqueur"}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
  return (
    <div className="map-single">
      {draggableMarkerExample(position, setPosition)}
    </div>
  );
}
