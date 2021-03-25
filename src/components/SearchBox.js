import React, {useState} from 'react';



const SearchBox = ({handleSearch}) => {
    const [query, setQuery] = useState('');


    const handleQueryChange = (e)=>{
        setQuery(e.target.value);
    }

    const handleSubmitQuery=(e)=>{
        e.preventDefault();
        handleSearch(query);
        setQuery('');
    }


    return(
        <form onSubmit={handleSubmitQuery}>
            <label> Search
                <input
                    type="text"
                    name="q"
                    value={query}
                    onChange={handleQueryChange}
                />
            </label>
        </form>
    )
}


export default SearchBox;