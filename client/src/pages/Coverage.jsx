import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const cities = [
  {
    name: "Dhaka",
    coords: [23.8103, 90.4125],
    desc: "HQ — 24/7 same-day decorators",
  },
  {
    name: "Chittagong",
    coords: [22.3569, 91.7832],
    desc: "Wedding & corporate teams",
  },
  {
    name: "Sylhet",
    coords: [24.8949, 91.8687],
    desc: "Home & event decorators",
  },
  { name: "Khulna", coords: [22.8456, 89.5403], desc: "On-call setup teams" },
  {
    name: "Rajshahi",
    coords: [24.3745, 88.6042],
    desc: "Floral & theme specialists",
  },
  {
    name: "Barishal",
    coords: [22.701, 90.3535],
    desc: "Available on schedule",
  },
];

export default function Coverage() {
  return (
    <div className="container-app py-10">
      <h1 className="heading">Service Coverage Map</h1>
      <p className="subheading mb-6">
        StyleDecor decorators are available across these divisions.
      </p>
      <div className="rounded-2xl overflow-hidden border border-base-300 h-[70vh]">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={6.5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((c) => (
            <Marker key={c.name} position={c.coords}>
              <Popup>
                <strong>{c.name}</strong>
                <div className="text-xs">{c.desc}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
