import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountry } from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;
const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('country-info'),
}
  refs.searchInput.addEventListener('input',onSearch)

function onSearch(e) {
   e.preventDefault()
    const searchQuery = e.currentTarget.value
    console.log(searchQuery);
    
 } 

