import React, {useState} from 'react';

function Search() {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    const updateSearch = e => {
        setSearch(e.target.value);
    }

    const getSearch = e => {
        e.preventDeafault();
        setQuery(search);
    }

    return (
        <div>
            <form className="search-form" onSubmit={getSearch}>
                <input className="search-input" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
}

export default Search;
