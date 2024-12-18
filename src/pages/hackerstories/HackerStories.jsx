import * as React from 'react';
// import { useState } from 'react';
import './HackerStories.css';
import bookLogo from '/The Road to React.png';
import axios from 'axios';
import { List } from './List';
// import { InputWithLabel } from './InputWithLabel';
import { SearchForm } from './SearchForm';
import LastSearches from './LastSearches';

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
  const getUrl = (searchTerm) => `${API_ENDPOINT}${searchTerm}`;
  const [urls, setUrls] = React.useState([
    getUrl(searchTerm),
    // `${API_ENDPOINT}${searchTerm}`,
  ]);

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
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl); // This says the following code will wait until the get is complete!
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
      setNbrOfResults(result.data.nbHits); // Update number of results!
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

  const handleSearchSubmit = (event) => {
    handleSearch(searchTerm);
    // const url = `${API_ENDPOINT}${searchTerm}`;
    // setUrls(urls.concat(url));
    //setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const handleClear = (event) => {
    setSearchTerm('');
    setNbrOfResults(0);
    stories.data = [];
  };

  const extractSearchTerm = (url) => url.replace(API_ENDPOINT, '');
  //const getLastSearches = (urls) => urls.slice(-5).map((url) => extractSearchTerm(url));
  //const getLastSearches = (urls) => urls.slice(-5).map(extractSearchTerm);
  const getLastSearches = (urls) =>
    urls
      .reduce((result, url, index) => {
        const searchTerm = extractSearchTerm(url);
        if (index === 0) {
          return result.concat(searchTerm);
        }
        const previousSearchTerm = result[result.length - 1];
        if (searchTerm === previousSearchTerm) {
          return result;
        } else {
          return result.concat(searchTerm);
        }
      }, [])
      .slice(-6)
      .slice(0, -1);
  //.map(extractSearchTerm);
  const lastSearches = getLastSearches(urls);
  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
    // const url = `${API_ENDPOINT}${searchTerm}`;
    // setUrls(urls.concat(url));
  };

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
      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />
      {/* <p>Previous Searches: 
      {lastSearches.map((searchTerm, index) => (
        <button
          key={searchTerm + index}
          type="button"
          onClick={() => handleLastSearch(searchTerm)}>{searchTerm}</button>
      ))}
      </p> */}
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
        <div>
          <p>
            Number of results found <strong>{nbrOfResults.toLocaleString()}</strong>
          </p>
          <List list={stories.data} onRemoveItem={handleRemoveStory} />
        </div>
      )}
    </div>
  );

};

export default HackerStories;
