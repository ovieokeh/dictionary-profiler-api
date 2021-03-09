import { useState, useEffect } from 'react'

import sleep from '../../helpers/sleep'

import { ReactComponent as AudioIcon } from '../../assets/audio.svg'
import './Definitions.css'

export default function Definitions({ entries }) {
  const [selectedEntry, setSelectedEntry] = useState(entries ? entries[0] : null)
  const [activeEntry, setActiveEntry] = useState(entries ? 0 : null)

  useEffect(() => {
    if (entries && entries.length > 0) {
      setSelectedEntry(entries[0])
      setActiveEntry(0)
    } else {
      setSelectedEntry(null)
    }
  }, [entries])

  const handleSelectEntry = (index, entry) => {
    setSelectedEntry(entry)
    setActiveEntry(index)
  }

  const renderEntries = () => {
    return entries.map((entry, index) => {
      const isActiveEntry = activeEntry === index

      return (
        <button
          key={index}
          className={`entry ${isActiveEntry ? 'entry--active' : ''.trim()}`}
          type="button"
          onClick={() => handleSelectEntry(index, entry)}
        >
          <span>{entry.entry}</span>
          <span className="entry__sub-text">{` (${entry.interpretations[0].partOfSpeech})`}</span>
        </button>
      )
    })
  }

  let Entries

  if (entries) {
    if (entries.length === 0) {
      Entries = <p className="no-results">No results found for that word. Check your spelling</p>
    } else {
      Entries = renderEntries()
    }

  } else {
    Entries = <p className="empty-entries">Search for a word to see definitions</p>
  }

  const handleAudioButtonClick = () => {
    const audio = document.querySelector('#pronunciation')
    audio.play()
  }

  const renderSelectedEntry = () => {
    const definitions = selectedEntry.lexemes[0].senses
    return (
      <div className="selected-entry">
        <div className="info">
          {selectedEntry.pronunciations?.filter(pronunciation => pronunciation.transcriptions)
            .map((pronunciation, index) => {
              return (
                <div key={index} className="info__pronunciations">
                  <div className="info__transcriptions">
                    {pronunciation.transcriptions.map(transcription => (
                      <span key={transcription.transcription} className="info__transcription">
                        <span className="info__transcription-text">
                          {`${transcription.transcription} (${transcription.notation})`}
                        </span>
                      </span>
                    ))}

                    {pronunciation.audio && (
                      <span title={`How to pronounce ${selectedEntry.entry}`} onClick={handleAudioButtonClick}>
                        <AudioIcon />
                        <audio id="pronunciation" src={pronunciation.audio.url}></audio>
                      </span>
                    )}
                  </div>
                </div>
              )
            }
          )}
        </div>

        {definitions.map((definition, index) => {
          const headingText = `Definition of ${selectedEntry.entry} (${index + 1} of ${definitions.length})`

          return (
            <div key={index} className="definitions__entry">
              <h2 className="definitions__entry-heading">{headingText}</h2>
              <p className="definitions__entry-description">{definition.definition}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const SelectedEntry = selectedEntry ? renderSelectedEntry() : null

  // Simulate a slow render
  sleep(30)

  return (
    <div className="definitions">
      <div className="entries">{Entries}</div>
      <div className="selected-entry__container">
        {SelectedEntry}
      </div>
    </div>
  )
}
