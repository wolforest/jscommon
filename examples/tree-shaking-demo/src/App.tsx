import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ArrayUtil } from '@wolforest/jscommon'

function App() {
  const [count, setCount] = useState(0)
  
  // 使用ArrayUtil.concat方法
  const array1 = [1, 2, 3]
  const array2 = [4, 5, 6]
  const concatenated = ArrayUtil.concat(array1, array2)
  
  // 使用ArrayUtil.chunk方法
  const chunked = ArrayUtil.chunk([1, 2, 3, 4, 5, 6], 2)

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
      <h1>Tree-shaking Demo</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Testing ArrayUtil.concat: [1,2,3] + [4,5,6] = {JSON.stringify(concatenated)}
        </p>
        <p>
          Testing ArrayUtil.chunk: [1,2,3,4,5,6] into size 2 = {JSON.stringify(chunked)}
        </p>
      </div>
    </>
  )
}

export default App
