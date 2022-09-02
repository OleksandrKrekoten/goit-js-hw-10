import './css/styles.css'
import debounce from 'lodash.debounce'
import CountryApiService from './js/fetchCountries'
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300
const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
const countryApiService = new CountryApiService()

refs.searchInput.addEventListener('input',debounce (onSearch, DEBOUNCE_DELAY))


function onSearch(e) {
  e.preventDefault()
  countryApiService.query = e.target.value.trim()
  countryApiService.fetchCountries()
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
      }
      renderMarkup(data)
    })
    .catch(error => {
      resetMarkup(refs.countryList)
      resetMarkup(refs.countryInfo)
      Notiflix.Notify.failure('Oops, there is no country with that name')
    })
}

function renderMarkup (data){
   if (data.length === 1) {
    resetMarkup(refs.countryList)
    const info = createMarkupInfo(data)
refs.countryInfo.innerHTML = info
  } if(data.length >=2 && data.length<10) {
    resetMarkup(refs.countryInfo)
    const list = createMarkupList(data);
refs.countryList.innerHTML = list
  }
}

function createMarkupList (data) { 
    return data
    .map(
      ({ name, flags }) =>
        `<li class = "item"><img src="${flags.svg}" alt="${name.official}" width="80" height="40" class = "item-img">${name.official}</li>`)
    .join('')
}

function createMarkupInfo (data) {
    return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.png}" alt="${name.official}" width="80" height="50">${
        name.official
      }</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
  )
}
 

function resetMarkup(link) {
  link.innerHTML = ''
}

