import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Search.css';
import { Alert } from 'react-bootstrap';


function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [screen, setScreen] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    async function googleBooks() {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&projection=lite&key=AIzaSyDVqTtYCbz6j_mseH7rOziGR6SywHNAz9I`);
        const data = await response.json();
        console.log(data);
        setSearchResults(data);
    }

    const handleSubmit = async () => {
        if (!searchTerm.trim()) { 
            setShowAlert(true); 
            return; 
        }
        await googleBooks();
        setSearched(true);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleNextResult = () => {
        setScreen(screen + 1);
    };
    const handlePreviousResult = () => {
        setScreen(screen - 1);
    };

    return (
        <div>
            {showAlert && (
                <Alert id = "alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    Please enter a search term.
                </Alert>
            )}
            {!searched && <div>
                <h1>PagePal</h1>
                <input type="text" value={searchTerm} onChange={handleInputChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>};
            {searched && (
                <div id = "search-result">
                    <h2>If you're interested in {searchTerm}, you might like...</h2>
                    <div id="entry">
                        <div id = "link-section">
                            <a href={searchResults['items'][screen]['volumeInfo']['previewLink']} target="_blank">
                                <button>Preview on Google Books</button>
                            </a>
                            <a href={searchResults['items'][screen]?.saleInfo?.buyLink} target="_blank">
                                <button disabled={!searchResults['items'][screen]?.saleInfo || !searchResults['items'][screen]?.saleInfo?.listPrice}>
                                    {searchResults['items'][screen]?.saleInfo?.listPrice ? (
                                        `Buy for ${searchResults['items'][screen]?.saleInfo?.listPrice?.amount} ${searchResults['items'][screen]?.saleInfo?.listPrice?.currencyCode} on Google Books`
                                    ) : (
                                        'Sale information not available'
                                    )}
                                </button>
                            </a>
                            {screen !== searchResults['items'].length - 1  && <button onClick={handleNextResult}>Next Result</button>}
                            {screen !== 0 && <button onClick={handlePreviousResult}>Previous Result</button>}
                        </div>
                        <div id = "results">
                            {searchResults['items'][screen]?.volumeInfo?.imageLinks?.thumbnail && (
                                <img src={searchResults['items'][screen]['volumeInfo']['imageLinks']['thumbnail']} alt="Book cover" />
                            )}
                            <h3>{searchResults['items'][screen]['volumeInfo']['title']}</h3>
                            {searchResults['items'][screen]?.volumeInfo?.authors && searchResults['items'][screen]['volumeInfo']['authors'].length > 0 && (
                                <h4>{searchResults['items'][screen]['volumeInfo']['authors'].join(', ')}</h4>
                            )}                        
                            <h5>{searchResults['items'][screen]['volumeInfo']['description']}</h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
