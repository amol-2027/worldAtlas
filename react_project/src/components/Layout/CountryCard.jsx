import { NavLink } from "react-router-dom";

export const CountryCard = ({
  country,
  isFavorite,
  toggleFavorite,
  isSelected,
  toggleSelectCountry,
}) => {
  const { flags, name, population, region, capital } = country;
  return (
    <li className="country-card card">
      <div className="container-card bg-white-box">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={flags.svg} alt={flags.alt} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelectCountry(name.common)}
              title="Select for comparison"
              style={{
                width: "1.3rem",
                height: "1.3rem",
                accentColor: "#25b09b",
                cursor: "pointer",
              }}
            />
            <button
              className="favorite-btn"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={() => toggleFavorite(name.common)}
              style={{
                fontSize: "2rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isFavorite ? "#e74c3c" : "#888",
                marginLeft: "0.5rem",
              }}
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>
        </div>
        <div className="countryInfo">
          <p className="card-title">
            {name.common.length > 10
              ? name.common.slice(0, 10) + "..."
              : name.common}
          </p>
          <p>
            <span className="card-description">Population:</span>
            {population.toLocaleString()}
          </p>
          <p>
            <span className="card-description">Region:</span>
            {region}
          </p>
          <p>
            <span className="card-description">Capital:</span>
            {capital[0]}
          </p>
          <NavLink to={`/country/${name.common}`}>
            <button>Read More</button>
          </NavLink>
        </div>
      </div>
    </li>
  );
};
