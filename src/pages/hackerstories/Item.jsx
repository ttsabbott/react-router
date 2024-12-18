import * as React from 'react';

export const Item = ({ item, onRemoveItem }) => {
  return (
    <li style={{ display: 'flex' }} key={item.objectID}>
      <span style={{ width: '40%' }}>
        <a href={item.url} target="_blank">{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>{item.author}</span>
      <span style={{ width: '10%' }}>{item.num_comments}</span>
      <span style={{ width: '10%' }}>{item.points}</span>
      <span style={{ width: '10%' }}>
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
