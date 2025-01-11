import { useRef, useEffect } from 'react';

export const InputWithLabel = ({
  id, value, type = 'text', isFocused, onInputChange,
  // onInputSubmit,
  // onInputClear,
  // qty,
  children,
}) => {
  const inputRef = useRef();
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <div>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange} />
      {/* <button id="submit" type="button" disabled={!value} onClick={onInputSubmit}>Submit</button> */}
      {/* <button id="clear" type="button" disabled={!value} onClick={onInputClear}>Clear</button> */}
      {/* <p>
                Searching for <strong>{value}</strong>
              </p> */}
      {/* <p>
                Number of results found <strong>{qty}</strong>
              </p> */}
    </div>
  );
};
