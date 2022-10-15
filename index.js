// npm i lodash.debounce
//  npm i notiflix

// import "./css/styles.css";
// import debounce from "../node_modules/lodash.debounce";
// import { Notify } from "../node_modules/notiflix";

// import {fetchCountries } from "./fetchCountries";
//  add debounce to function
// change alert to notify  function

const BASE_URL = "https://restcountries.com";

function fetchCountries(countryName) {
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
}

const DEBOUNCE_DELAY = 300;

console.log("anything");

const input = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

console.log(input);

function cleanMarkup(ref) {
  ref.innerHTML = "";
}

function inputHandler(e) {
  const textInput = e.target.value.trim();

  if (!textInput) {
    cleanMarkup(countryList);
    cleanMarkup(countryInfo);
    return;
  }

  fetchCountries(textInput)
    .then((data) => {
      console.log(data);
      if (data.length > 10) {
        alert("Too many matches found. Please enter a more specific name");
        return;
      }
      renderMarkup(data);
    })
    .catch((err) => {
      cleanMarkup(countryList);
      cleanMarkup(countryInfo);
      alert("Oops, there is no country with that name");
    });
}

function renderMarkup(data) {
  if (data.length === 1) {
    cleanMarkup(countryInfo);
    const markupInfo = createInfoMarkup(data);
    countryInfo.innerHTML = markupInfo;
  } else {
    cleanMarkup(countryList);
    const markupList = createListMarkup(data);
    countryList.innerHTML = markupList;
  }
}

function createListMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li>
        <img src="${flags.png}" 
        alt="${name.official}" 
        width="40" height="30">
        ${name.official}
        </li>`
    )
    .join("");
}

function createInfoMarkup(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.png}" alt="${
        name.official
      }" width="70" height="50">${name.official}</h1>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${Object.values(languages)}</p>`
  );
}

input.addEventListener("input", inputHandler);
