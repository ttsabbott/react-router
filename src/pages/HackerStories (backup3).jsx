import { useState } from 'react';
import './App.css';
import * as React from 'react';
import bookLogo from './assets/The Road to React.png';

const title = 'React';

const App = () => {

  const initialStories = [
    { title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 4, objectId: 0, },
    { title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectId: 1, },
    { title: 'The Road to React', url: 'https://www.road-to-next.com/', author: 'Robin Wieruch', num_comments: 5, points: 9, objectId: 2, },
    { title: 'jQuery', url: 'https://jquery.com/', author: 'OpenJS', num_comments: 3, points: 2, objectId: 3, },
    { title: 'Bootstrap', url: 'https://getbootstrap.com/', author: 'Bootstrap Team', num_comments: 1, points: 4, objectId: 4, },
  ];

  const XgetAsyncStories = () =>
    // Promise.resolve({ data: { stories: initialStories } }); <- this is the shorthand version
    new Promise((resolve) =>
      setTimeout(
        () => resolve({ data: { stories: initialStories } }),
        2000
      )
    );
  const getAsyncStories = () =>
    new Promise((resolve, reject) => setTimeout(reject, 2000));

  const storiesReducer = (state, action) => {
    /*
    if (action.type === 'SET_STORIES') {
      return action.payload;
    } else if (action.type === 'REMOVE_STORY') {
      return state.filter(
        (story) => action.payload.objectId !== story.objectId
      );
    } else {
      throw new Error();
    }
    */
    switch (action.type) {
      // case 'SET_STORIES':
      //   return action.payload;
      // case 'REMOVE_STORY':
      //   return state.filter(
      //     (story) => action.payload.objectId !== story.objectId
      //   );
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
            (story) => action.payload.objectId !== story.objectId
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

  //const [stories, setStories] = React.useState([]); // initialStories);
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false } // []
  );
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    // setIsLoading(true);
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    getAsyncStories().then(result => {
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS', // 'SET_STORIES',
        payload: result.data.stories,
      });
      // setStories(result.data.stories);
      // setIsLoading(false);
    })
      .catch(() =>
        // setIsError(true)
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, []);

  const handleRemoveStory = (item) => {
    // const newStories = stories.filter(
    //   (story) => item.objectId !== story.objectId
    // );
    // dispatchStories({
    //   type: 'SET_STORIES',
    //   payload: newStories,
    // });
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
    // setStories(newStories);
  }

  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem('search') || 'React'
  // );
  // React.useEffect(() => {
  //   localStorage.setItem('search', searchTerm);
  // }, [searchTerm]);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // localStorage.setItem('search', event.target.value);
  };
  const handleClear = (event) => {
    setSearchTerm('');
    // localStorage.setItem('search', '');
  };
  // const searchedStories = stories.filter((story) =>
  //   story.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [toggle, setToggle] = React.useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  // const [timer, setTimer] = React.useState(0);
  // React.useEffect(() => {
  //   // const interval = setInterval(
  //   //   () => setTimer(timer + 1),
  //   //   1000
  //   // );
  //   const interval = setInterval(
  //     () => setTimer((currentTimer) => currentTimer + 1),
  //     1000
  //   );
  //   return () => clearInterval(interval);
  // }, [timer]);

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }

  return (
    <div>
      <img src={bookLogo} alt="The Road to React" height="218" width="175" style={{ 'float': 'right' }} />
      <h3>My Hacker {title} Stories</h3>
      <InputWithLabel
        id="search"
        // label="Search"
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
      {/* <div>{timer}</div> */}
    </div>
  );

};

const Toggler = ({ toggle, onToggle }) => {
  // React.useEffect(() => {
  //   console.log('I run on every render: mount + update.');
  // }); // Note: no second parameter, runs on every render!
  // React.useEffect(() => {
  //   console.log('I run only on the first render: mount.');
  // }, []); // Note: empty array second parm, which means it will only run on the first render!
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
    // console.log('I run only if toggle changes (and on mount).');
    // if (didMount.current) {
    //   console.log('I run only if toggle changes.');
    // } else {
    //   didMount.current = true;
    // }
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

{/* another way to define the Search, thus eliminating the function's block body */ }
// const Search = ({ search, onSearch, onClear }) => (
const InputWithLabel2 = ({
  id,
  // label, <-- replaced by children
  value,
  type = 'text',
  onInputChange,
  onInputClear,
  children,
}) => (
  <React.Fragment>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
    <button id="clear" onClick={onInputClear}>Clear</button>
    <p>
      Searching for <strong>{value}</strong>
    </p>
  </React.Fragment>
);

const InputWithLabel3 = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  onInputClear,
  children,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      autoFocus={isFocused}
      onChange={onInputChange}
    />
    <button id="clear" onClick={onInputClear}>Clear</button>
    <p>
      Searching for <strong>{value}</strong>
    </p>
  </>
);

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  isFocused,
  onInputChange,
  onInputClear,
  children,
}) => {
  // A
  const inputRef = React.useRef();
  // C
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B */}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        // autoFocus={isFocused}
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
      <Item key={item.objectId} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => {
  // const handleRemoveItem = () => {
  //   onRemoveItem(item);
  // };
  return (
    <li key={item.objectId}>
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
