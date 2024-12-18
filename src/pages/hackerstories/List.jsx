import * as React from 'react';
import { Item } from './Item';
import { SORTS } from './SORTS';

export const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
  });
  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    //setSort({ sortKey: sortKey, isReverse: isReverse });
    setSort({ sortKey, isReverse }); // this is called: shorthand object initializer notation (when the property name in your object is the same as your variable name, you can omit the key/value pair notation)
  };
  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);
  return (
    <ul>
      <li style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}><button type="button" onClick={() => handleSort('TITLE')}>Title</button></span>
        <span style={{ width: '30%' }}><button type="button" onClick={() => handleSort('AUTHOR')}>Author</button></span>
        <span style={{ width: '10%' }}><button type="button" onClick={() => handleSort('COMMENT')}>Comments</button></span>
        <span style={{ width: '10%' }}><button type="button" onClick={() => handleSort('POINT')}>Points</button></span>
        <span style={{ width: '10%' }}>Actions</span>
      </li>
      {sortedList.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
};
