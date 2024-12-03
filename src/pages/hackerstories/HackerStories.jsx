import { useState } from 'react';
import './HackerStories.css';
import * as React from 'react';
import bookLogo from '/The Road to React.png';
import axios from 'axios';

const title = 'React';
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const HackerStories = () => {

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'STORIES_FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'STORIES_FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload
        };
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case 'REMOVE_STORY':
        return {
          ...state,
          data: state.data.filter(
            (story) => action.payload.objectID !== story.objectID
          ),
        };
      default:
        throw new Error();
    }
  }

  const useStorageState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );
    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
  };
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [nbrOfResults, setNbrOfResults] = useStorageState('qty', 0);
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  // TODO Why is this being called twice? On initial load and when submitted...
  const XhandleFetchStories = React.useCallback(() => {
    if (!searchTerm) return;
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(url)
      .then((response) => response.json()) // <- this is needed with the default "fetch" command, whereas, axios automatically parses data to json!
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits,
        });
        setNbrOfResults(result.data.nbHits);
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, [url]);

  // Using async/await & try/catch, the handleFetchStories now looks like this...
  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    try {
      const result = await axios.get(url); // This says the following code will wait until the get is complete!
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
      setNbrOfResults(result.data.nbHits); // Update number of results!
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  }
  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  const handleClear = (event) => {
    setSearchTerm('');
    setNbrOfResults(0);
    stories.data = [];
  };

  const SearchForm = ({
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

  return (
    <div>
      <a href="https://www.roadtoreact.com/" target="_blank"><img src={bookLogo} alt="The Road to React" height="218" width="175" style={{ 'float': 'right' }} /></a>
      <h3>My Hacker {title} Stories</h3>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onSearchClear={handleClear}
      />
      {/* <form onSubmit={handleSearchSubmit}>
          <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={handleSearchInput}
          // onInputSubmit={handleSearchSubmit}
          // onInputClear={handleClear}
          // qty={nbrOfResults}
          >
            <strong>Search:</strong>
          </InputWithLabel>
          <button id="submit" type="submit" disabled={!searchTerm}>Submit</button>
          <button id="clear" type="button" disabled={!searchTerm} onClick={handleClear}>Clear</button>
        </form> */}
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
      {stories.isError && <p>Something went wrong...</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            Number of results found <strong>{nbrOfResults.toLocaleString()}</strong>
          </p>
          <List list={stories.data} onRemoveItem={handleRemoveStory} />
        </>
      )}
    </div>
  );

};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  isFocused,
  onInputChange,
  // onInputSubmit,
  // onInputClear,
  // qty,
  children,
}) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
      {/* <button id="submit" type="button" disabled={!value} onClick={onInputSubmit}>Submit</button> */}
      {/* <button id="clear" type="button" disabled={!value} onClick={onInputClear}>Clear</button> */}
      {/* <p>
          Searching for <strong>{value}</strong>
        </p> */}
      {/* <p>
          Number of results found <strong>{qty}</strong>
        </p> */}
    </>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => {
  return (
    <li key={item.objectID}>
      <span>
        <a href={item.url} target="_blank">{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        {/* Fourth version, inline arrow function, doesn't need the additional handler, uses javascript bind function, but has block body */}
        <button type="button" className="sm-btn" onClick={() => {
          // do something else
          // note: avoid using complex logix in JSX
          onRemoveItem(item);
        }}>Dismiss</button>
      </span>
    </li>
  );
};

export default HackerStories;
