import React from "react";

const coverage = () => {
  const position = [51.505, -0.09];
  return (
    <div>
      <h2 className="text-5xl text-fuchsia-600"> We are all 64 District</h2>
      <div></div>
      <div>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default coverage;
