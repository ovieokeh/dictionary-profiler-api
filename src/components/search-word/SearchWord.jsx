import { useCallback, useEffect, useState } from 'react'

import fetchWord from '../../helpers/api'

import Definitions from '../definitions/Definitions'
import Input from '../input/Input'

import './SearchWord.css'

export default function SearchWord() {
  const [wordToSearchFor, setWordToSearchFor] = useState('')
  const [entries, setEntries] = useState(null)

  useEffect(() => {
    const updateEntries = async (word) => {
      const response = await fetchWord(word)
      setEntries(response.entries)
    }

    wordToSearchFor ? updateEntries(wordToSearchFor) : setEntries(null)
  }, [wordToSearchFor])

  const onFinishTyping = useCallback((inputValue) => {
    setWordToSearchFor(inputValue)
  }, [])

  return (
    <div className="container">
      <Input onFinishTyping={onFinishTyping} />
      <Definitions entries={entries} />
    </div>
  )
}
