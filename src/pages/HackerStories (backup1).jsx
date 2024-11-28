import { useState } from 'react';
import './App.css';
import * as React from 'react';

const title = 'React';

const welcome = {
  greeting: 'Hey',
  title: 'React',
};

// const list = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectId: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectId: 1,
//   },
// ];

const getTitle = () => {
  return (
    welcome.title
  );
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectId: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectId: 1,
    },
  ];
  const [searchTerm, setSearchTerm] = React.useState('');
  // A
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // D
    console.log('inside App.handleSearch, event.target.value: ' + event.target.value);
  };
  return (
    <div>
      {/* this is a jsx comment */}
      <h1>{welcome.greeting} {welcome.title}</h1>
      <h2>{welcome.greeting} {getTitle()}</h2>
      <h3>My Hacker Stories</h3>
      <hr />
      {/* // B */}
      <Search onSearch={handleSearch}/>
      {/* {Search2()}<br /> */}
      <hr />
      <List list={stories} />
      <hr />
      {/* <List /> */}
    </div>
  );
};

const Search = (props) => {
  // const [searchTerm, setSearchTerm] = React.useState('');
  //let searchTerm = '';
  // const handleChange = (event) => {
  //   // setSearchTerm(event.target.value);
  //   // C
  //   props.onSearch(event);
  //   // searchTerm = event.target.value;
  //   // synthetic event
  //   // console.log('inside Search.handleChange, event: ' + JSON.stringify(event));
  //   // value of target (here: input HTML element)
  //   console.log('inside Search.handleChange, event.target.value: ' + event.target.value);
  //   // event.preventDefault();
  // };
  const handleBlur = (event) => {
    // synthetic event
    // console.log('inside Search.handleBlur, event: ' + JSON.stringify(event));
    // value of target (here: input HTML element)
    console.log('inside Search.handleBlur, event.target.value: ' + event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text"
        //onChange={handleChange}
        onChange={props.onSearch}
        onBlur={handleBlur} />
      <p>
        Searching for <strong>{props.searchTerm}</strong>
      </p>
    </div>
  );
};

{/* Note: This Search function does away with the curly braces and the return statement */ }
// const Search = () => (
//   <div>
//     <label htmlFor="search">Search: </label>
//     <input id="search" type="text" />
//   </div>
// );

const Search2 = () => {
  return <label>Search #2: <input id="search2" type="text" /></label>;
};

const List = (props) => {
  return (
    <ul>
      {props.list.map((item) => (
        <ItemObj key={item.objectId} item={item} />
      ))}
      {/* {props.list.map((item) => {
        return (
          <li key={item.objectId}>
            <span>
              <a href={item.url} target="_blank">{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        );
      })} */}
    </ul>
  );
};

const ItemObj = (props) => (
  <li key={props.item.objectId}>
    <span>
      <a href={props.item.url} target="_blank">{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

const addOne = (count) => {
  return count + 1;
};

const addOneAgain = (count) =>
  count + 1;

const addOneAgainAgain = (count) => count + 1;

{/* this is a good use of the handleClick event */ }
function MyComponent() {
  const [count, setCount] = useState(0);
  const handleClick = (value) => {
    setCount(count + value);
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => handleClick(1)}>Increment</button>
      <button onClick={() => handleClick(-1)}>Decrement</button>
    </div>
  );
};

export default App;
