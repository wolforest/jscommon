import { useState } from 'react'
import { NumberUtil, DateUtil, StringUtil } from '@wolforest/jscommon'

function App() {
  const [result, setResult] = useState('')

  const testJsCommon = () => {
    // 测试数字工具
    const sum = NumberUtil.add(0.1, 0.2)
    
    // 测试日期工具
    const formattedDate = DateUtil.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    
    // 测试字符串工具
    const camelCaseStr = StringUtil.camelCase('hello-world')

    setResult(`
      数字相加: ${sum}
      格式化日期: ${formattedDate}
      驼峰命名: ${camelCaseStr}
    `)
  }

  return (
    <div>
      <h1>React Demo</h1>
      <button onClick={testJsCommon}>Test JSCommon</button>
      <pre>{result}</pre>
    </div>
  )
}

export default App 