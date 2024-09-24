import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@tanstack/react-query'
import { get } from './services/api'

function App() {
  const [count, setCount] = useState(0)
  const [queryActive, setQueryActive] = useState(false)

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await get('/get_entries')

      console.log(response.data)
      setQueryActive(false)
      

      return response.data
      
    },
    //retryOnMount: false,
    enabled: queryActive,
  })

  const handleTest = async () => {
    console.log('Test')
    setQueryActive(true)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Web Crawler</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className='card'>
        <button onClick={handleTest}>
          See results
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
