const BASE_URL = `https://the-one-api.dev/v2/`;

const bearerToken = `Bearer dhO0HDe6y43i3z0VXql4`;
const character = `character`; // endpoint
const URL = `${BASE_URL}${character}?limit=10&page=1`;
console.log(URL);

const options = {
  headers: {
    Authorization: bearerToken,
  },
};

export function apiRings() {
  //   fetch(URL, options)
  //   .then((data) =>
  //   console.log(data)
  // );

  console.log(URL);
}
