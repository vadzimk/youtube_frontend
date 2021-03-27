import React, {useState} from 'react';

const styles = {
    barContainer: {
        maxWidth: '800px', margin: "auto",
    },
}

const SearchBox = ({handleSearch}) => {
    const [query, setQuery] = useState('');

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmitQuery = (e) => {
        e.preventDefault();
        handleSearch(query);
        setQuery('');
    }

    return (
            <div className="search bar ui segment" style={styles.barContainer}>
                <form onSubmit={handleSubmitQuery}>
                    <div className="ui fluid action input">
                        <input
                            type="text"
                            name="q"
                            value={query}
                            onChange={handleQueryChange}
                            placeholder="Search"
                        />
                        <button className="ui icon button">
                            <i className="search icon"/>
                        </button>

                    </div>
                </form>
            </div>
    )
}


export default SearchBox;