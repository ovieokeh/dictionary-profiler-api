import sleep from '../../helpers/sleep'

import './Input.css'

export default function Input({ inputValue, onInputChange }) {
  // Simulate a slow render
  sleep(5)

  return (
    <div className="input">
      <label className="input__label">
        <span className="input__span">Word to search for:</span>
        <input className="input__field" type="text" value={inputValue} onChange={onInputChange} />
      </label>
    </div>
  )
}
