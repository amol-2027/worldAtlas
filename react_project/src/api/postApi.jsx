import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

//HTTP GET METHOD
export const getCountryData = () => {
  // Fetch all countries with selected fields
  return api.get("/all?fields=name,capital,languages,flags,region,population");
};

// http get method for indvi .country name

export const getCountryIndData = (name) => {
  // Fetch all countries with selected fields
  return api.get(
    `/name/${name}?fullText=true&fields=name,capital,languages,flags,region,population,subregion,tld,currencies,borders,flags`
  );
};
