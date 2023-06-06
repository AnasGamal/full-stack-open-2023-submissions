import WeatherContainer from "./WeatherContainer"
const SingleResult = ({singleCountry}) => {
    const PrintLang = ({langs}) => {
        const langNames = Object.values(langs) 
        if (langNames.length === 1) {
            return (
            <li>{langNames[0]}</li>
            )
        }
        else {
             return (
                langNames.map((lang) => (
                        <li key={lang}>{lang}</li>
                    ))
                )}
    }
    return (
        <div>
        <h1>{singleCountry.name.common}</h1>
        <p>capital {singleCountry.capital}</p>
        <p>area {singleCountry.area}</p>
        <h2>Languages:</h2>
        <ul>
        <PrintLang langs={singleCountry.languages} />
        </ul>
        <img src={singleCountry.flags.png} />
        <WeatherContainer cityName={singleCountry.capital} />
    </div>
    )
}

export default SingleResult