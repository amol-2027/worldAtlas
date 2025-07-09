import { useEffect, useState, useTransition, useRef } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/Layout/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/Layout/UI/SearchFilter";
import { WorldMap } from "../components/Layout/WorldMap";

const THEMES = [
  { value: "default", label: "Default" },
  { value: "ocean", label: "Ocean" },
  { value: "sunset", label: "Sunset" },
  { value: "forest", label: "Forest" },
];

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(false);
  const [offline, setOffline] = useState(false);
  const [favoriteCountries, setFavoriteCountries] = useState(() => {
    const favs = localStorage.getItem("favoriteCountries");
    return favs ? JSON.parse(favs) : [];
  });
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "default"
  );
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const cardRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCountryData();
        setCountries(res.data);
        localStorage.setItem("countries", JSON.stringify(res.data));
        setOffline(false);
      } catch (error) {
        // If fetch fails, try to use localStorage
        const cached = localStorage.getItem("countries");
        if (cached) {
          setCountries(JSON.parse(cached));
          setOffline(true);
        } else {
          setCountries([]);
          setOffline(true);
        }
      }
    };
    startTransition(fetchData);
  }, []);

  // Save favorites to localStorage when changed
  useEffect(() => {
    localStorage.setItem(
      "favoriteCountries",
      JSON.stringify(favoriteCountries)
    );
  }, [favoriteCountries]);

  // Toggle dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    return () => document.body.classList.remove("dark");
  }, [darkMode]);

  // Theme class on body
  useEffect(() => {
    document.body.classList.remove(...THEMES.map((t) => t.value));
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  };
  const filterRegion = (country) => {
    if (filter === "all") return country;
    return country.region === filter;
  };

  // Filter and search logic
  let filterCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  // Sort logic
  filterCountries = filterCountries.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return b.name.common.localeCompare(a.name.common);
    }
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Favorite logic
  const toggleFavorite = (countryName) => {
    setFavoriteCountries((prev) =>
      prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName]
    );
  };

  // Comparison logic
  const toggleSelectCountry = (countryName) => {
    setSelectedCountries((prev) =>
      prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName]
    );
  };

  const selectedCountryObjects = countries.filter((country) =>
    selectedCountries.includes(country.name.common)
  );

  // Scroll to card when a country is selected on the map
  const handleCountrySelectFromMap = (countryName) => {
    if (cardRefs.current[countryName]) {
      cardRefs.current[countryName].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      cardRefs.current[countryName].classList.add("highlight-card");
      setTimeout(() => {
        cardRefs.current[countryName].classList.remove("highlight-card");
      }, 1500);
    }
  };

  return (
    <section className="country-section">
      <WorldMap
        countries={countries}
        onCountrySelect={handleCountrySelectFromMap}
      />
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          theme={theme}
          setTheme={setTheme}
          themes={THEMES}
        />
      </div>
      {offline && (
        <div
          style={{
            color: "#e67e22",
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: 600,
          }}
        >
          You are offline. Showing cached country data.
        </div>
      )}
      {selectedCountries.length >= 2 && !showComparison && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <button
            className="compare-btn"
            onClick={() => setShowComparison(true)}
          >
            Compare ({selectedCountries.length})
          </button>
        </div>
      )}
      {showComparison ? (
        <div
          className="comparison-table-wrapper"
          style={{ overflowX: "auto", margin: "2rem 0" }}
        >
          <button
            onClick={() => setShowComparison(false)}
            style={{
              marginBottom: "1rem",
              padding: "0.5rem 1.5rem",
              borderRadius: "1rem",
              border: "none",
              background: "#25b09b",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close Comparison
          </button>
          <table
            className="comparison-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "rgba(0,0,0,0.03)",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "0.7rem",
                    borderBottom: "2px solid #25b09b",
                  }}
                >
                  Flag
                </th>
                <th
                  style={{
                    padding: "0.7rem",
                    borderBottom: "2px solid #25b09b",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0.7rem",
                    borderBottom: "2px solid #25b09b",
                  }}
                >
                  Population
                </th>
                <th
                  style={{
                    padding: "0.7rem",
                    borderBottom: "2px solid #25b09b",
                  }}
                >
                  Region
                </th>
                <th
                  style={{
                    padding: "0.7rem",
                    borderBottom: "2px solid #25b09b",
                  }}
                >
                  Capital
                </th>
                <th
                  style={{
                    padding: "0.7rem",
                    borderBottom: "2px solid #25b09b",
                  }}
                >
                  Area (km²)
                </th>
                <th
                  style={{
                    padding: "0.7rem",
                    borderBottom: "2px solid #25b09b",
                  }}
                >
                  Languages
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedCountryObjects.map((country, idx) => (
                <tr
                  key={country.name.common}
                  style={{
                    background:
                      idx % 2 === 0 ? "rgba(37,176,155,0.07)" : "transparent",
                  }}
                >
                  <td style={{ textAlign: "center", padding: "0.7rem" }}>
                    <img
                      src={country.flags.svg}
                      alt={country.flags.alt}
                      style={{
                        width: "40px",
                        height: "28px",
                        objectFit: "cover",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </td>
                  <td style={{ padding: "0.7rem", fontWeight: 600 }}>
                    {country.name.official}
                  </td>
                  <td style={{ padding: "0.7rem" }}>
                    {country.population.toLocaleString()}
                  </td>
                  <td style={{ padding: "0.7rem" }}>{country.region}</td>
                  <td style={{ padding: "0.7rem" }}>
                    {country.capital && country.capital[0]}
                  </td>
                  <td style={{ padding: "0.7rem" }}>
                    {country.area ? country.area.toLocaleString() : "-"}
                  </td>
                  <td style={{ padding: "0.7rem" }}>
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ul className="grid grid-four-cols">
          {filterCountries.map((curCountry, index) => {
            return (
              <li
                key={index}
                ref={(el) => (cardRefs.current[curCountry.name.common] = el)}
              >
                <CountryCard
                  country={curCountry}
                  isFavorite={favoriteCountries.includes(
                    curCountry.name.common
                  )}
                  toggleFavorite={toggleFavorite}
                  isSelected={selectedCountries.includes(
                    curCountry.name.common
                  )}
                  toggleSelectCountry={toggleSelectCountry}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
