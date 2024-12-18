import { sortBy } from 'lodash';

export const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, (item) => item.title.toLowerCase()), //'title'),
  AUTHOR: (list) => sortBy(list, (item) => item.author.toLowerCase()), //'author'),
  COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
  POINT: (list) => sortBy(list, 'points').reverse(),
};
