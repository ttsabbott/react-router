import { InputWithLabel } from './InputWithLabel';

export const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
    onSearchClear,
}) => (
    <form onSubmit={onSearchSubmit}>
        <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
        >
            <strong>Search:</strong>
        </InputWithLabel>
        <button id="submit" type="submit" disabled={!searchTerm}>Submit</button>
        <button id="clear" type="button" disabled={!searchTerm} onClick={onSearchClear}>Clear</button>
    </form>

);

// export default SearchForm;
