import React, { useEffect, useState,useRef } from "react";
import "./Translationpage.css";
import logos from "../assets/translate.png";

const Translationpage = () => {
    const [inputText, setinputText] = useState("");
    const [outputText, setoutputText] = useState("");
    const [fromLang, setfromLang] = useState("en");
    const [toLang, settoLang] = useState("kn");
    const [loading,setLoading] = useState(false);
    const [displaytext,setDisplaytext] = useState("");
    const textareaRef = useRef(null);
    const handleInputtext = (e) => {
        setinputText(e.target.value);
    };
    const handleOutputtext = (e) => {
        setLoading(true);
        setoutputText(e.target.value);
        
    };

    const handleFromlang = (e) => {
        setfromLang(e.target.value);
        console.log(fromLang);
    };
    const handletoLang = (e) => {
        settoLang(e.target.value);
    };
    const handleCopy = ()=>{
        if(textareaRef.current.value){
            navigator.clipboard.writeText(textareaRef.current.value);
            alert("Text copied Successfully");
        }
    }

    const handleSubmitbutton = async () => {
        if (!inputText) {
            alert("Cant translate empty text");
            return;
        }
        if (!fromLang || !toLang) {
            alert("Please Select the languages");
            return;
        }
        setLoading(true);
        try {
            const url = `https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=${fromLang}&to=${toLang}&query=${inputText}`;
            const options = {
                method: "POST",
                headers: {
                    "x-rapidapi-key":
                        "4cf78d2819mshafbddade235aafep12a22bjsnab778a9354da",
                    "x-rapidapi-host": "free-google-translator.p.rapidapi.com",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify,
            };
            const response = await fetch(url, options);
            const data = await response.json();
            setTimeout(() => {
            setLoading(false);
            setoutputText(data.translation);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="main-card">
            <header className="heading">
                <h1 className="translate-heading">Translator App</h1>
            </header>

            <div className="bef-translate-div">
                <h3 className="from-to">From</h3>
                <select
                    name="selection"
                    id=""
                    className="selection-main"
                    value={fromLang}
                    onChange={handleFromlang}
                >
                    <option value="en">English</option>
                    <option value="kn">Kannada</option>
                    <option value="hi">Hindi</option>
                    <option value="tcy">Tulu</option>
                    <option value="ja">Japanese</option>
                    <option value="ml">Malayalam</option>
                    <option value="gom">Konkani</option>
                </select>
                <br />

                <input
                    type="textarea"
                    className="text-area"
                    value={inputText}
                    onChange={handleInputtext}
                    placeholder="Enter text to translate"
                />
            </div>
            <h3>{loading?"Translating... Please Wait":"Click to Translate"}</h3>
            <button className="trans-submit" onClick={handleSubmitbutton}>
                <img src={logos} alt="" className="logos" />
            </button>
            <div className="after-translate-div">
                <h3 className="from-to">To</h3>
                <select
                    name="selection"
                    id=""
                    className="selection-main"
                    value={toLang}
                    onChange={handletoLang}
                >
                    <option value="kn">Kannada</option>
                    <option value="hi">Hindi</option>
                    <option value="en">English</option>
                    <option value="ja">Japanese</option>
                    <option value="tcy">Tulu</option>
                    <option value="ml">Malayalam</option>
                    <option value="gom">Konkani</option>
                </select>
                <br />
                <span className="textarea-container">
                    <button className="copy-btn" onClick={handleCopy}>Copy</button>
                    <input
                        type="textarea"
                        ref={textareaRef}
                        className="text-area"
                        value={outputText}
                        onChange={handleOutputtext}
                        placeholder="Your translated text will appear here"
                    />
                </span>
            </div>
            <button
                className="translate-submit"
                type="submit"
                onClick={handleSubmitbutton}
            >
                Translate
            </button>
        </div>
    );
};

export default Translationpage;
