import React, { ChangeEvent, FormEvent, useState } from 'react'

function SearchField(props: { setEnteredLocation: (value: string) => void }) {
  const { setEnteredLocation } = props
  const [value, setValue] = useState<string>()

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  const handleLocationSearch = (e: FormEvent) => {
    if (!value) return
    e.preventDefault()
    setEnteredLocation(value)
    setValue(' ')
  }

  return (
    <form>
      <input type='search' value={value || ''} placeholder='Enter location' onChange={handleValueChange} />
      <button type='submit' onClick={handleLocationSearch}>
        Find
      </button>
    </form>
  )
}

export default SearchField
