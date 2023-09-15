import { useState } from 'react'
import './App.css'

type Synonym = {
  word: string,
  score: number
}

const API_URL = 'https://api.datamuse.com'

function App() {
  const [word, setWord] = useState<string>("")
  const [synonyms, setSynonyms] = useState<Synonym[]>([])

  const  handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/words?rel_syn=${word}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    console.log("data: ")
    console.log(data)
    setSynonyms(data)
  }

  return (
    <div className='App'>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="word-input">Your Word</label>
        <input 
          type="text" 
          id="word-input" 
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button>Submit</button>
      </form>
      {synonyms.map(syn => (<div key="syn.word" style={{display: 'flex', justifyContent: 'space-between'}}><span>{syn.word}</span> <span>score:{syn.score}</span></div>))}
    </div>
  )
}

export default App
