import { useCallback, useEffect, useState } from 'react'
import fetchWord from '../../helpers/api'

import Definitions from '../definitions/Definitions'
import Input from '../input/Input'

import './SearchWord.css'

export default function SearchWord() {
  const [formInput, setFormInput] = useState('')
  const [entries, setEntries] = useState(null)

  useEffect(() => {
    const updateEntries = async (word) => {
      const response = await fetchWord(word)
      setEntries(response.entries)
    }

    formInput ? updateEntries(formInput) : setEntries(null)
  }, [formInput])

  const handleInputChange = useCallback((event) => {
    event.preventDefault()
    setFormInput(event.target.value)
  }, [])

  return (
    <div className="container">
      <Input inputValue={formInput} onInputChange={handleInputChange}/>
      <Definitions entries={entries} />
    </div>
  )
}
