import { useState } from 'react';

function SearchField({ setEnteredLocation }) {
  const [value, setValue] = useState();

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    setEnteredLocation(value);
    setValue('');
  };

  return (
    <form>
      <input type='search' value={value} placeholder='Enter location' onChange={handleValueChange} />
      <button type='submit' onClick={handleLocationSearch}>
        Find
      </button>
    </form>
  );
}

export default SearchField;
