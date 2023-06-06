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
        return <SingleResult singleCountry={singleCountry} />
    }
    return
  }
  
  export default Results;
  