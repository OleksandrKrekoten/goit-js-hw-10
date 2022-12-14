
export default class CountryApiService {
    constructor() {
        this.searchQuery = ''
    }
    fetchCountries() {
      return  fetch(`https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`)
            .then(response => {
        if (response.status === 404) {
        return Promise.reject(new Error());
      }
                return response.json()
            })
    }
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
    
}

