import countryFacts from "../api/countryData.json";

export const About = () => {
  return (
    <section className="section-about container">
      <h2 className="container-title">
        Here are the Interesting Facts
        <br /> we're proud of
      </h2>
      <div className="gradient-cards">
        {countryFacts.countries.map((country) => {
          const { id, countryName, capital, currency, interestingFact } =
            country;
          return (
            <div className="card" key={id}>
              <div className="container-card bg-blue-box">
                <p className="card-title">{countryName}</p>
                <p>
                  <span className="card-descripton">Capital:</span>
                  {capital}
                </p>
                <p>
                  <span className="card-descripton">Currency:</span>
                  {currency}
                </p>
                <p>
                  <span className="card-descripton">Interesting Fact:</span>
                  {interestingFact}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
