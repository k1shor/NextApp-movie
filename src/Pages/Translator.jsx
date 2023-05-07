import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Translator = () => {
    const [text, setText] = useState('')
    const [result, setResult] = useState('')
    const [languages, setLanguages] = useState([])
    const [result_lang, setResultLang] = useState('en')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`https://text-translator2.p.rapidapi.com/getLanguages`, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': 'c1676562bemshdc8da717e701e8bp10de36jsn8cefcf161696',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            }
        })
            .then(res => res.json())
            .then(res => setLanguages(res.data.languages))
    }, [])

    const translate = () => {
        setLoading(true)
        const encodedParams = new URLSearchParams();
        encodedParams.append("source_language", "en");
        encodedParams.append("target_language", result_lang);
        encodedParams.append("text", text);

        const url = 'https://text-translator2.p.rapidapi.com/translate';

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'c1676562bemshdc8da717e701e8bp10de36jsn8cefcf161696',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            body: encodedParams
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setLoading(false)
                setResult(json.data.translatedText)})
            .catch(err => console.error('error:' + err))
    }



    return (
        <>
        <div className="container">
        <select name="lang" id="" className="form-control w-25" onChange={e => setResultLang(e.target.value)}>
                {languages && languages.map(lang => {
                    return <option key={lang.code} value={lang.code}>{lang.name}</option>
                })}
            </select>
            <div className="row">
                <div className="col-md-5 p-5 d-flex btn-group">
                <input type="text" onKeyUp={e => setText(e.target.value)}  className="form-control"/>
                <button className="btn btn-info" onClick={translate}> → </button>
                </div>
                <div className="col-md-5 p-5">
                    {loading ? <Loading/> : result}
                </div>
            </div>
        </div>
                        
        </>
    )
}

export default Translator