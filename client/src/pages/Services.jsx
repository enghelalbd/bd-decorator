import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../hooks/useAxios";
import ServiceCard from "../components/ServiceCard";
import Loading from "../components/Loading";

const categories = [
  "home",
  "wedding",
  "office",
  "seminar",
  "meeting",
  "birthday",
  "anniversary",
];

export default function Services() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [
      "services",
      search,
      category,
      minBudget,
      maxBudget,
      sortBy,
      order,
      page,
    ],
    queryFn: async () => {
      const params = { search, category, sortBy, order, page, limit: 9 };
      if (minBudget) params.minBudget = minBudget;
      if (maxBudget) params.maxBudget = maxBudget;
      const { data } = await axiosPublic.get("/services", { params });
      return data;
    },
    keepPreviousData: true,
  });

  return (
    <div className="container-app py-10">
      <h1 className="heading mb-2">Our Decoration Services</h1>
      <p className="subheading mb-6">
        Find the perfect package for your space or occasion.
      </p>

      <div className="grid md:grid-cols-5 gap-3 mb-8">
        <input
          className="input input-bordered md:col-span-2"
          placeholder="Search by service name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c}
            </option>
          ))}
        </select>
        <input
          className="input input-bordered"
          type="number"
          placeholder="Min Budget"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
        />
        <input
          className="input input-bordered"
          type="number"
          placeholder="Max Budget"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <p className="text-sm text-neutral/60">
          {data?.total ?? 0} services found
        </p>
        <div className="flex gap-2">
          <select
            className="select select-bordered select-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="cost">Price</option>
            <option value="service_name">Name</option>
          </select>
          <select
            className="select select-bordered select-sm"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.items?.map((s) => (
              <ServiceCard key={s._id} s={s} />
            ))}
          </div>
          {data?.pages > 1 && (
            <div className="join mt-8 flex justify-center">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`join-item btn btn-sm ${page === p ? "btn-primary" : ""}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
