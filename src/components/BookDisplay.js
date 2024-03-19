import React, {useState, useEffect} from 'react';

import "./BookDisplay.css";


const BookDisplay = ({ }) => {

    const BASE_URL = "https://gutendex.com/books?";

    const[tb1, setTb1] = useState(""); 
    const[tb2, setTb2] = useState(""); 
    const[tb3, setTb3] = useState(""); 

    const[title, setTitle] = useState(""); 
    const[id, setId] = useState(""); 
    const[subjects, setSubjects] = useState(""); 
    const[authors, setAuthors] = useState(""); 
    const[translators, setTranslators] = useState(""); 
    const[bookshelves, setBookshelves] = useState("");
    const[languages, setLanguages] = useState(""); 
    const[copyright, setCopyright] = useState(""); 
    const[media_type, setMedia_type] = useState(""); 
    const[download_count, setDownload_count] = useState(0); 
    const[link, setLink] = useState(""); 

    useEffect(() => {
        fetch_id(1);
    }, []);

    function update_book(book) {
        console.log(book);
        setTitle(book.title);
        setId(book.id);
        setSubjects(book.subjects.join(", "));
        let authors = [];
        for (let i = 0; i < book.authors.length; i++) {
            authors.push(book.authors[i].name);
        }
        setAuthors(authors.join(",, "));
        if (book.translators.length > 0 && typeof(book.translators[0]) === "object") {
            let translators = [];
            for (let i = 0; i < book.translators.length; i++) {
                translators.push(book.translators[i].name);
            }
            setTranslators(translators.join(",, "));
        } else {
            setTranslators(book.translators.length === 0 ? "None" : book.translators.join(",, "));
        }
        setBookshelves(book.bookshelves.length === 0 ? "None" : book.bookshelves.join(", "));
        setLanguages(book.languages.join(", "));
        setCopyright(book.copyright ? "Yes" : "No");
        setMedia_type(book.media_type);
        setDownload_count(book.download_count);
        let format = "";
        for (const [type, link] of Object.entries(book.formats)) {
            format = link;
            break;
        }
        setLink(format);
    }

    async function fetch_lang() {
        try {
            const response = await fetch(BASE_URL + "languages=" + tb1);
            const json = await response.json();
            let res = json.results;
            if (res.length === 0) {
               alert("Invalid language code, see https://www.wikiwand.com/en/List_of_ISO_639_language_codes");
            } else {
                update_book(res[Math.floor(Math.random() * res.length)]);
            }
            setTb1("");
        } catch {
            alert("Gutendex API is not responding");
        }
    }

    async function fetch_key() {
        try {
            const response = await fetch(BASE_URL + "search=" + tb2);
            const json = await response.json();
            let res = json.results;
            if (res.length === 0) {
               alert("No books exist with those keywords");
            } else {
                update_book(res[Math.floor(Math.random() * res.length)]);
            }
            setTb2("");
        } catch {
            alert("Gutendex API is not responding");
        }
    }

    async function fetch_id() {
        try {
            const response = await fetch(BASE_URL + "ids=" + tb3);
            const json = await response.json();
            let res = json.results;
            if (res.length === 0) {
               alert("No books exist with that ID");
            } else {
                update_book(res[0]);
            }
            setTb3("");
        } catch {
            alert("Gutendex API is not responding");
        }
    }

    async function fetch_lucky() {
        try {
            const response = await fetch(BASE_URL);
            const json = await response.json();
            let res = json.results;
            update_book(res[Math.floor(Math.random() * res.length)]);
            setTb3("");
        } catch {
            alert("Gutendex API is not responding");
        }
    }

    return (
        <div className='display-box'>
            <div className='col'>
                <div className='row'>
                    <div className='col lang-text'> 
                     <p> Two-character language code:</p>
                    </div>
                    <div className='col lang-box'>
                        <input type='text' value={tb1} onChange={(e) => {setTb1(e.target.value)}}></input>
                    </div>
                    <div className='col'>
                        <button className='button-search' onClick={fetch_lang}> Search</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col key-text'> 
                     <p> Keyword search:</p>
                    </div>
                    <div className='col key-box'>
                        <input type='text' value={tb2} onChange={(e) => {setTb2(e.target.value)}}></input>
                    </div>
                    <div className='col'>
                        <button className='button-search' onClick={fetch_key}> Search</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col id-text'> 
                     <p> Lookup by ID:</p>
                    </div>
                    <div className='col id-box'>
                        <input type='text' value={tb3} onChange={(e) => {setTb3(e.target.value)}}></input>
                    </div>
                    <div className='col'>
                        <button className='button-search' onClick={fetch_id}> Search</button>
                    </div>
                </div>
                <div>
                    <button className='button-random' onClick={fetch_lucky}> I'm Feeling Lucky</button>
                </div>
                <div className='book-data'>
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Subjects:</strong> {subjects}</p>
                    <p><strong>Authors:</strong> {authors}</p>
                    <p><strong>Translators:</strong> {translators}</p>
                    <p><strong>Bookshelves:</strong> {bookshelves}</p>
                    <p><strong>Languages:</strong> {languages}</p>
                    <p><strong>Copyright:</strong> {copyright}</p>
                    <p><strong>Media Type:</strong> {media_type}</p>
                    <p><strong>Download Count:</strong> {download_count}</p>
                    <p><strong>Link:</strong> {link}</p>
                </div>
            </div>
        </div>
    );
}

export default BookDisplay;