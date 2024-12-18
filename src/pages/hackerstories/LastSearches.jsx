const LastSearches = ({ lastSearches, onLastSearch }) => (
    <p>Previous Searches:
        {lastSearches.map((searchTerm, index) => (
            <button
                key={searchTerm + index}
                type="button"
                onClick={() => onLastSearch(searchTerm)}>{searchTerm}</button>
        ))}
    </p>
);

export default LastSearches;
