import countries_data from "./country_data.js";

// DOM variables
let startingWordsSearchToggle = document.querySelector('.startingWordsButton');
let anyWordsSearchToggle = document.querySelector('.anyWordsButton');
let alphabeticalSortToggle = document.querySelector('.alphabeticalSortButton');
let isToggled = false;
let searchInput = document.querySelector('.inputSearch');
const wrapperCountries = document.querySelector('.countries');

const countriesName = countries_data.map((country) => country.name);

// Variables to track the sort order
let sortAscending = true;

// Functions
function appendFilteredNames(filteredNames) {
    for (let i = 0; i < filteredNames.length; i++) {
        const divBox = document.createElement('div');
        divBox.classList.add('countryBox');
        const countryName = document.createElement('p');
        countryName.classList.add('countryName');
        countryName.innerText = filteredNames[i];

        divBox.appendChild(countryName);
        wrapperCountries.appendChild(divBox);
    }
}

function handleSearchToggle(toggleButton, toggleState, eventListener) {
    if (toggleState) {
        toggleButton.classList.toggle('on');
        searchInput.addEventListener('input', eventListener);
    } else {
        toggleButton.classList.toggle('on');
        searchInput.removeEventListener('input', eventListener);
    }
}

// Event Listeners
let startingWordsSearchEventListener = (e) => {
    let capitalizedSearch = e.target.value;
    const filteredNames = countriesName.filter((filtered) => filtered.startsWith(capitalizedSearch.charAt(0).toUpperCase() + capitalizedSearch.slice(1)));

    wrapperCountries.innerHTML = '';
    appendFilteredNames(filteredNames);
};

let anyWordsSearchEventListener = (e) => {
    const flattenedCountryNames = countriesName.map((country) => country.charAt(0).toLowerCase() + country.slice(1));
    const filteredNames = flattenedCountryNames.filter((filtered) => filtered.includes(e.target.value));

    wrapperCountries.innerHTML = '';
    appendFilteredNames(filteredNames);
};

let alphabeticalSortEventListener = () => {
    const countries = document.querySelectorAll('.countryName');
    const sortedCountries = Array.from(countries).sort((a, b) =>
        sortAscending
            ? a.innerText.localeCompare(b.innerText, 'en', { sensitivity: 'base' })
            : b.innerText.localeCompare(a.innerText, 'en', { sensitivity: 'base' })
    );

    const sortedCountriesArr = sortedCountries.map((country) => country.innerText);

    wrapperCountries.innerHTML = '';
    appendFilteredNames(sortedCountriesArr);

    // Toggle the sort order for the next click
    sortAscending = !sortAscending;
};

// Search Logic

// 1) Searching with starting words
if (startingWordsSearchToggle) {
    startingWordsSearchToggle.addEventListener('click', () => {
        isToggled = !isToggled;
        handleSearchToggle(startingWordsSearchToggle, isToggled, startingWordsSearchEventListener);
    });
}

// 2) Searching with any words
if (anyWordsSearchToggle) {
    anyWordsSearchToggle.addEventListener('click', () => {
        isToggled = !isToggled;
        handleSearchToggle(anyWordsSearchToggle, isToggled, anyWordsSearchEventListener);
    });
}

// 3) Sort the searched countries
if (alphabeticalSortToggle) {
    alphabeticalSortToggle.addEventListener('click', () => {
        alphabeticalSortToggle.classList.toggle('on'); // Toggle the "on" class for visual indication
        alphabeticalSortEventListener();
    });
}
