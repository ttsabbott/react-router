CREATE TABLE blogs (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  author VARCHAR,
  timestamp timestamp default now() NOT NULL
);
