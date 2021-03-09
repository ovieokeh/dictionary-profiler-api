import { useEffect, useState } from 'react'

import sleep from '../../helpers/sleep'

import './Input.css'

export default function Input({ onFinishTyping }) {
  const [inputValue, setInputValue] = useState('')
  const [timeoutValue, setTimeoutValue] = useState(null)

  useEffect(() => {
    const finishTyping = () => {
      clearTimeout(timeoutValue)

      setTimeoutValue(setTimeout(() => {
        onFinishTyping(inputValue)
      }, 300))
    }

    if (inputValue) {
      finishTyping()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, onFinishTyping])

  function handleInputChange (event) {
    event.preventDefault()
    setInputValue(event.target.value)
  }

  // Simulate a slow render
  sleep(5)

  return (
    <div className="input">
      <label className="input__label">
        <span className="input__span">Word to search for:</span>
        <input className="input__field" type="text" value={inputValue} onChange={handleInputChange} />
      </label>
    </div>
  )
}
