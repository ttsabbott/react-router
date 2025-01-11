import { useState } from 'react';
import './App.css';

const title = 'React';

const welcome = {
  greeting: 'Hey',
  title: 'React',
};

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
  const [searchTerm, setSearchTerm] = useState('React');
  // A
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // D
    // console.log('inside App.handleSearch, event.target.value: ' + event.target.value);
  };
  // const searchedStories = stories.filter(function (story) {
  //   return story.title.includes(searchTerm);
  // });
  const handleClear = (event) => {
    setSearchTerm('');
  };
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {/* this is a jsx comment */}
      {/* <h1>{welcome.greeting} {welcome.title}</h1>
      <h2>{welcome.greeting} {getTitle()}</h2> */}
      <h3>My Hacker Stories</h3>
      {/* <hr /> */}
      {/* // B */}
      <Search onSearch={handleSearch} search={searchTerm} onClear={handleClear} />{/* list={searchedStories} /> */}
      {/* <hr /> */}
      <List list={searchedStories} />
    </div>
  );
};

{/* another way to define the Search, thus eliminating the function's block body */ }
const Search = ({ search, onSearch, onClear }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text"
      value={search}
      onChange={onSearch}
    />
    <button id="clear" onClick={onClear}>Clear</button>
    <p>
      Searching for <strong>{search}</strong>
    </p>
  </div>
);
const SearchX = (props) => {
  const { search, onSearch } = props; {/* deconstruct object */ }
  return (
    <div>
      <label htmlFor="search">Search: </label>
      {/* using object directly */}
      {/* <input id="search" type="text"
        value={props.search}
        onChange={props.onSearch}
      /> */}
      {/* using deconstructed object */}
      <input id="search" type="text"
        value={search}
        onChange={onSearch}
      />
      <button id="clear" onClick={props.onClear}>Clear</button>
      {/* <p>
        Searching for <strong>{props.search}</strong>
      </p> */}
    </div>
  );
};

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectId} item={item} />
    ))}
  </ul>
);
// const List = (props) => {
//   return (
//     <ul>
//       {props.list.map((item) => (
//         <Item key={item.objectId} item={item} />
//       ))}
//     </ul>
//   );
// };

const Item = ({ item }) => (
  <li key={item.objectId}>
    <span>
      <a href={item.url} target="_blank">{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);
// const Item = (props) => (
//   <li key={props.item.objectId}>
//     <span>
//       <a href={props.item.url} target="_blank">{props.item.title}</a>
//     </span>
//     <span>{props.item.author}</span>
//     <span>{props.item.num_comments}</span>
//     <span>{props.item.points}</span>
//   </li>
// );

const user = {
  firstName: 'Robin',
  pet: {
    name: 'Trixi',
  },
};

const firstName2 = user.firstName;
const name2 = user.pet.name;
console.log(firstName2 + ' has a pet called ' + name2);

const {
  firstName,
  pet: {
    name,
  },
} = user;

console.log(firstName + ' has a pet called ' + name);

const Item3 = ({
  item: {
    title,
    url,
    author,
    num_comments,
    points,
  },
}) => (
  <li>
    <span>
      <a href={url} target="_blank">{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

// Variation 2: Spread and Rest Operations
// 1. Step
const List3 = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectId}
        title={item.title}
        url={item.url}
        author={item.author}
        num_comments={item.num_comments}
        points={item.points}
      />
    ))}
  </ul>
);

const Item2 = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url} target="_blank">{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

const profile = {
  firstName: 'Robin',
  lastName: 'Wieruch',
};

const address = {
  country: 'Germany',
  city: 'Berlin',
};

const user2 = {
  ...profile,
  gender: 'male',
  ...address,
};
console.log(user2);

// Variation 2: Spread and Rest Operators
// 2. Step

const List2 = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectId} {...item} />
    ))}
  </ul>
)

const user3 = {
  id: '1',
  firstName: 'Robin',
  lastName: 'Wieruch',
  country: 'Germany',
  city: 'Berlin',
};
const { id, country, city, ...userWithoutAddress } = user3;
console.log(userWithoutAddress);
console.log(id);
console.log(city);

export default App;
