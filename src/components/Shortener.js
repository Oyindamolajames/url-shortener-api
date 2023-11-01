import { useEffect, useState } from "react"
import bgMobile from "../images/bg-shorten-mobile.svg"
import bgDesktop from "../images/bg-shorten-desktop.svg"


const getLocalStorage = () => {
    let links =  localStorage.getItem("links")

    if (links) {
        return JSON.parse(localStorage.getItem("links"))
    } else {
        return []
    }
}

// https://api.shrtco.de/v2/shorten?url=

export default function Shortener() {
    const [text, setText] = useState("")
    const [links, setLinks] = useState(getLocalStorage())
    const [buttonText, setButtonText] = useState("Copy")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text){
            alert("Url is empty! Please enter a valid url")
        } else {
            const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
            const options = {
	            method: 'POST',
	            headers: {
		        'content-type': 'application/x-www-form-urlencoded',
		        'X-RapidAPI-Key': 'b93f3d6a56mshcc098cd80104447p154e9ejsnfc9fd8c4f970',
	        	'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
	        },
	        body: new URLSearchParams({
	    	url: text  // 'https://google.com/' //`{text}`
	    })
        };


    const shrtenLink = async () => {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    console.log(text)
    setLinks(result.result_url)
    setText("")
    }

    shrtenLink()
        }
    }
     

    //const text1;
    
    const handleCopy = () => {
        navigator.clipboard.writeText(links) 
        setButtonText("Copied!")

    }

    useEffect(() => {
        localStorage.setItem("links"                                                                                                                                                   , JSON.stringify(links))
    }, [links])
    


  return (
    <>
        <section className="max-width shortener relative">
            <picture>
                <source media="(min-width: 768px)" srcset={bgDesktop} />
                <img src={bgMobile} alt="" />
            </picture>

            <form className="form" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row">
                    <input type="url" 
                    placeholder="Shorten a link here!"  
                    required
                    className="w-full py-2 px-5 rounded-lg  mb-2 md:mb-0" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}/>
                    <button 
                    type="submit" 
                    className="btn-cta rounded-lg w-full md:w-40 md:ml-5"
                    onClick={handleSubmit}
                    >
                        Shorten It!
                    </button>
                </div>

            </form>

            <div className="flex flex-col items-center justify-center 
            bg-white md:flex-row md:justify-between p-3 mt-3 rounded-lg shadow" >
            
            <article>
                <ul>
                    <li><button className="text-cyan-500">{text}</button></li>
                </ul>

                </article>

                <article>
                    <ul>
                    <li><button className="text-cyan-500">{links}</button></li>
                    <li><button className="btn-cta rounded-lg"

                    onClick={handleCopy}>{buttonText}</button></li>

                    </ul>
                </article>
            </div>
        </section>
    </>
  )
}
