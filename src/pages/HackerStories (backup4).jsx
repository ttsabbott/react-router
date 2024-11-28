import { useState } from 'react';
import './App.css';
import * as React from 'react';
import bookLogo from './assets/The Road to React.png';

const title = 'React';
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {

  /*
  const initialStories = [
    { title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 4, objectID: 0, },
    { title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectID: 1, },
    { title: 'The Road to React', url: 'https://www.road-to-next.com/', author: 'Robin Wieruch', num_comments: 5, points: 9, objectID: 2, },
    { title: 'jQuery', url: 'https://jquery.com/', author: 'OpenJS', num_comments: 3, points: 2, objectID: 3, },
    { title: 'Bootstrap', url: 'https://getbootstrap.com/', author: 'Bootstrap Team', num_comments: 1, points: 4, objectID: 4, },
  ];

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve({ data: { stories: initialStories } }),
        2000
      )
    );
  // Use the following to test error handling!
  const XgetAsyncStories = () =>
    new Promise((resolve, reject) => setTimeout(reject, 2000));
  */

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

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false } // []
  );

  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(`${API_ENDPOINT}react`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        })
      })
      // getAsyncStories().then(result => {
      //   dispatchStories({
      //     type: 'STORIES_FETCH_SUCCESS',
      //     payload: result.data.stories,
      //   });
      // })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, []);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleClear = (event) => {
    setSearchTerm('');
  };
  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [toggle, setToggle] = React.useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <img src={bookLogo} alt="The Road to React" height="218" width="175" style={{ 'float': 'right' }} />
      <h3>My Hacker {title} Stories</h3>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
        onInputClear={handleClear}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      {stories.isError && <p>Something went wrong...</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
      <Toggler toggle={toggle} onToggle={handleToggle} />
    </div>
  );

};

const Toggler = ({ toggle, onToggle }) => {
  const didMount = React.useRef(false);
  const calledOnce = React.useRef(false);
  const [title, setTitle] = React.useState('Hello React');
  React.useEffect(() => {
    console.log('I run if toggle or title change (and on mount).');
  }, [toggle, title]);
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  React.useEffect(() => {
    if (calledOnce.current) {
      return;
    }
    if (toggle === false) {
      console.log('I run only once if toggle is false.');
      calledOnce.current = true;
    }
  }, [toggle]); // Note: by passing the variable as the second parm, this will only run if variable changes!
  return (
    <> {/* This is the shorthand abbreviation of React.Fragment */}
      <input type="text" value={title} onChange={handleChange} />
      <button type="button" onClick={onToggle}>
        Toggle
      </button>
      {toggle && <div>{title}</div>}
    </>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  isFocused,
  onInputChange,
  onInputClear,
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
      <button id="clear" onClick={onInputClear}>Clear</button>
      <p>
        Searching for <strong>{value}</strong>
      </p>
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
        {/* Original version which requires the additional handler at the beginning of the method */}
        {/* <button type="button" onClick={handleRemoveItem}>Dismiss</button> */}
        {/* Second version, inline handler, doesn't need the additional handler, uses javascript bind function */}
        {/* <button type="button" onClick={onRemoveItem.bind(null, item)}>Dismiss</button> */}
        {/* Third version, inline arrow function, doesn't need the additional handler, uses javascript bind function */}
        {/* <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button> */}
        {/* Fourth version, inline arrow function, doesn't need the additional handler, uses javascript bind function, but has block body */}
        <button type="button" onClick={() => {
          // do something else
          // note: avoid using complex logix in JSX
          onRemoveItem(item);
        }}>Dismiss</button>
      </span>
    </li>
  );
};

// Chaining promises!
const chainingPromises = () => {
  doSomething(function (result) {
    doSomethingElse(result, function (newResult) {
      doThirdThing(newResult, function (finalResult) {
        console.log(`Got the final result: ${finalResult}`);
      }, failureCallback);
    }, failureCallback);
  }, failureCallback);
};

export default App;
