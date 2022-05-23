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
        zoom={12}
        minZoom={3}
        spotName={"undefined"}
        pays={"undefined"}
        draggable={draggable}
        setPosition={setPosition}
      />
    </div>
  );
};

export default React.memo(MapWithNoSSR);
