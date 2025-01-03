import { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { NumberUtil, DateUtil, StringUtil } from '@wolforest/jscommon'
import './index.scss'

export default function Index() {
  const [result, setResult] = useState('')

  const onJsCommon = () => {
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

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Button onClick={onJsCommon}>Test JSCommon</Button>
      <Text>{result}</Text>
    </View>
  )
}
