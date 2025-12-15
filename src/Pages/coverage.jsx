import React from "react";
import "leaflet/dist/leaflet.css";

const coverage = () => {
  const position = [51.505, -0.09];
  return (
    <div>
      <h2 className="text-5xl text-fuchsia-600 border w-full h-[800px]  ">
        {" "}
        We are all 64 District
      </h2>
      <div></div>
      <div>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default coverage;
