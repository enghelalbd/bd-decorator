import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../hooks/useAxios";
import ServiceCard from "../components/ServiceCard";
import DecoratorCard from "../components/DecoratorCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const coverage = [
  { name: "Dhaka", coords: [23.8103, 90.4125] },
  { name: "Chittagong", coords: [22.3569, 91.7832] },
  { name: "Sylhet", coords: [24.8949, 91.8687] },
  { name: "Khulna", coords: [22.8456, 89.5403] },
  { name: "Rajshahi", coords: [24.3745, 88.6042] },
];

export default function Home() {
  const { data: services = [] } = useQuery({
    queryKey: ["featured-services"],
    queryFn: async () => (await axiosPublic.get("/services/featured")).data,
  });
  const { data: decorators = [] } = useQuery({
    queryKey: ["top-decorators"],
    queryFn: async () => (await axiosPublic.get("/decorators/top")).data,
  });

  return (
    <div>
      {/* HERO */}
      <section className="gradient-hero">
        <div className="container-app grid lg:grid-cols-2 items-center gap-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-semibold tracking-wider uppercase">
              StyleDecor
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary leading-tight mt-3">
              Decorate every moment with{" "}
              <span className="text-primary">elegance</span>.
            </h1>
            <p className="mt-4 text-neutral/70 max-w-lg">
              Book trusted decorators for home makeovers, weddings, birthdays,
              corporate events and more — all in one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/services" className="btn btn-primary btn-lg">
                Book Decoration Service
              </Link>
              <Link to="/coverage" className="btn btn-outline btn-lg">
                View Coverage
              </Link>
            </div>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200"
            alt="hero"
            className="rounded-3xl shadow-2xl border-4 border-base-100"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section container-app">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="heading">Featured Decoration Services</h2>
            <p className="subheading">
              Hand-picked packages our customers love most.
            </p>
          </div>
          <Link to="/services" className="btn btn-outline btn-primary">
            View all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s._id} s={s} />
          ))}
        </div>
      </section>

      {/* DECORATORS */}
      <section className="section bg-base-200">
        <div className="container-app">
          <div className="mb-8 text-center">
            <h2 className="heading">Top Decorators</h2>
            <p className="subheading mx-auto">
              Meet our highest-rated decoration specialists.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {decorators.map((d) => (
              <DecoratorCard key={d._id} d={d} />
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE MAP */}
      <section className="section container-app">
        <div className="mb-6">
          <h2 className="heading">Service Coverage</h2>
          <p className="subheading">
            We currently serve these cities across Bangladesh.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-base-300 h-[420px]">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={6.5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coverage.map((c) => (
              <Marker key={c.name} position={c.coords}>
                <Popup>{c.name} — StyleDecor services available</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      {/* WHY US */}
      <section className="section bg-base-200">
        <div className="container-app text-center">
          <h2 className="heading mb-3">Why StyleDecor?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
            {[
              {
                t: "Vetted Decorators",
                d: "Every decorator is approved by admin & rated by real customers.",
              },
              {
                t: "Transparent Pricing",
                d: "No hidden fees. See cost per sqft, floor, meter or event upfront.",
              },
              {
                t: "Live Project Status",
                d: "Track planning, prep, on-the-way and setup steps in real time.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="card bg-base-100 shadow border border-base-300"
              >
                <div className="card-body">
                  <h3 className="card-title text-primary">{x.t}</h3>
                  <p className="text-neutral/70">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
