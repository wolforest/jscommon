import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { NumberUtil, DateUtil, StringUtil } from '@wolforest/jscommon'

export default class Index extends Component {
  state = {
    result: ''
  }

  testJsCommon = () => {
    // 测试数字工具
    const sum = NumberUtil.add(0.1, 0.2)
    
    // 测试日期工具
    const formattedDate = DateUtil.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    
    // 测试字符串工具
    const camelCaseStr = StringUtil.camelCase('hello-world')

    this.setState({
      result: `
        数字相加: ${sum}
        格式化日期: ${formattedDate}
        驼峰命名: ${camelCaseStr}
      `
    })
  }

  render () {
    return (
      <View className='index'>
        <Button onClick={this.testJsCommon}>Test JSCommon</Button>
        <Text>{this.state.result}</Text>
      </View>
    )
  }
} 