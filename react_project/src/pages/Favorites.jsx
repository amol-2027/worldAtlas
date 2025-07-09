import { useEffect, useState } from "react";
import { CountryCard } from "../components/Layout/CountryCard";

export const Favorites = () => {
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const favs = localStorage.getItem("favoriteCountries");
    setFavoriteCountries(favs ? JSON.parse(favs) : []);
    const allCountries = localStorage.getItem("countries");
    setCountries(allCountries ? JSON.parse(allCountries) : []);
  }, []);

  const favoriteCountryObjects = countries.filter((country) =>
    favoriteCountries.includes(country.name.common)
  );

  return (
    <section className="country-section">
      <h2 style={{ textAlign: "center", margin: "2rem 0" }}>
        My Favorite Countries
      </h2>
      {favoriteCountryObjects.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", fontSize: "1.5rem" }}>
          No favorites yet. Go add some!
        </div>
      ) : (
        <ul className="grid grid-four-cols">
          {favoriteCountryObjects.map((country, index) => (
            <CountryCard
              country={country}
              key={index}
              isFavorite={true}
              toggleFavorite={() => {}}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
