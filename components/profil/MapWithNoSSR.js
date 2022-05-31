import React, { useState } from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = ({ draggable, position, setPosition }) => {
  const MapWithNoSSR = dynamic(() => import("../spots/Map.js"), {
    ssr: false,
  });

  return (
    <div className="map-single">
      <MapWithNoSSR
        position={position}
        zoom={13}
        minZoom={1}
        spotName={"Déplacer le marker"}
        pays={"sur le lieu de la photo"}
        draggable={draggable}
        setPosition={setPosition}
      />
    </div>
  );
};

export default React.memo(MapWithNoSSR);
