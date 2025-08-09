import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl font-bold text-blue-500'>Welcome to the Admin Panel</h1>
    </>
  )
}

export default App
