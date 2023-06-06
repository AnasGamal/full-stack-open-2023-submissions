const MultiResults = ({results, toggleShow}) => {
    return (
        <div>
          {results.map((result) => (
          <ul>
            <div key={result}>{result}</div>
            <button
            onClick={() => toggleShow(result)}
            >
                show
            </button>
          </ul>
          ))}
        </div>
      );
}

export default MultiResults