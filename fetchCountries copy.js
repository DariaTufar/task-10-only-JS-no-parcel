const BASE_URL = "https://restcountries.com";

const fetchCountries = (countryName) => {
  return fetch(
    `${BASE_URL}/v3.1/name/${countryName}?fields=name,capital,population,flags,languages `
  ).then((resp) => {
    if (resp.status === 404) {
      return Promise.reject(
        new Error(`Oops, there is no country with that name`)
      );
    }
    return resp.json();
  });
};

export { fetchCountries };
