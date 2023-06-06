import SingleResult from "./SingleResult";
import MultiResults from "./MultiResults";
const Results = ({ results, singleCountry, toggleShow}) => {

    if (results) {
      if (results.length < 10 && results.length > 1) {
        return (
        <MultiResults
        results={results}
        toggleShow={toggleShow}
        />
        );
      } else if (results.length > 10) {
        return <div>Too many matches, specify another filter</div>;
      } else if(results.length === 0) return <div>No results.</div>
    }
    if (singleCountry) {
        return (
            <div>
                <h1>{singleCountry.name.common}</h1>
                <p>capital {singleCountry.capital}</p>
                <p>area {singleCountry.area}</p>
                <h2>Languages:</h2>
                <SingleResult langs={singleCountry.languages} />
                <img src={singleCountry.flags.png} />
            </div>
        )
    }
    return
  }
  
  export default Results;
  