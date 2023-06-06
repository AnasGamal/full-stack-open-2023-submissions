import { useState, useEffect } from 'react'
import Results from './components/Results'
import countriesService from './services/countries'

const App = () => {
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])
  const [countries, setCountries] = useState(null)
  const [singleCountry, setSingleCountry] = useState(null)

  useEffect(() => {
      console.log('fetching countries...')
      countriesService
        .getAll()
        .then(returnedCountries => {
          setCountries(returnedCountries)
        })
  }, [])

  // display a loading element if countries is not yet loaded
  if(!countries) {
    return <div>loading...</div>
  }


  const filterCountries = (query) => {
    if (query) {
    const filteredCountries = countries.filter(country => country.toLowerCase().includes(query))
    if (filteredCountries.length === 1) {
      countriesService
      .getCountry(filteredCountries[0])
      .then(returnedSingleCountry => {
        setSingleCountry(returnedSingleCountry)
    } )}
    setResults(filteredCountries)
    }
    else if(query === '') setResults('')
  }

  const handleChange = (event) => {
    const query = event.target.value;
    const queryLoweredCase = query.toLowerCase();
    setValue(query)
    filterCountries(queryLoweredCase)
  }
  
  const toggleShow = (result) => {
    countriesService
    .getCountry(result)
    .then(returnedSingleCountry => {
      setSingleCountry(returnedSingleCountry)
      // clear results so that singleCountry condition in Results.js is activated
      setResults(null)
      // clear search input
      setValue('')
  } )
  }

  return (
    <div>
        find countries: <input value={value} onChange={handleChange} />
      <pre>
        <Results 
        results={results}
        singleCountry={singleCountry}
        toggleShow={toggleShow}
        />
      </pre>
    </div>
  )
}
export default App