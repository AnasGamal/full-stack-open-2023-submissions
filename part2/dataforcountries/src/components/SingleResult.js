const SingleResult = ({langs}) => {
    const PrintLang = ({langs}) => {
        const langNames = Object.values(langs) 
        if (langNames.length === 1) {
            return (
            <li>{langNames[0]}</li>
            )
        }
        else {
             return langNames.map(lang => <li key={lang}>{lang}</li>)
        }
    }
    return (
        <ul>
            <PrintLang langs={langs} />
        </ul>
    )
}

export default SingleResult