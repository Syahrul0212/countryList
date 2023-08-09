import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./query";

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredCountries = data.countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-500 p-4">
        <h1 className="text-white text-2xl text-center">Country List</h1>
        <input
          type="text"
          placeholder="Search countries..."
          className="block w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {selectedCountry && (
        <div className="bg-white p-4 mt-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">{selectedCountry.name}</h2>
          <p>
            Languages:{" "}
            {selectedCountry.languages.map((lang) => lang.name).join(", ")}
          </p>
          <p>Continent: {selectedCountry.continent.name}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredCountries.map((country) => (
          <div
            key={country.code}
            className={`p-4 bg-white shadow-md rounded-md cursor-pointer ${
              selectedCountry === country ? "bg-gray-200" : ""
            }`}
            onClick={() =>
              setSelectedCountry(country === selectedCountry ? null : country)
            }
          >
            <span className="text-2xl">{country.emoji}</span>
            <div className="mt-2">
              <h2 className="text-lg font-semibold">{country.name}</h2>
              <p>Capital: {country.capital}</p>
              <p>Currency: {country.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
