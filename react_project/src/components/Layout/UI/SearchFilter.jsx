export const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  darkMode,
  toggleDarkMode,
}) => {
  const handleInputChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleSelectChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  return (
    <section className="section-searchFiltercontainer searchfilter-center-row">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleInputChange}
      />
      <button
        className={sortOrder === "asc" ? "active" : ""}
        onClick={() => setSortOrder("asc")}
      >
        Asc
      </button>
      <button
        className={sortOrder === "desc" ? "active" : ""}
        onClick={() => setSortOrder("desc")}
      >
        Desc
      </button>
      <select
        className="select-section"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <button className="darkmode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </section>
  );
};
