<template>
  <div class="container">
    <h1>Vue Demo</h1>
    <button @click="testJsCommon">Test JSCommon</button>
    <pre>{{ result }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NumberUtil, DateUtil, StringUtil } from '@wolforest/jscommon'

const result = ref('')

const testJsCommon = () => {
  // 测试数字工具
  const sum = NumberUtil.add(0.1, 0.2)
  
  // 测试日期工具
  const formattedDate = DateUtil.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
  
  // 测试字符串工具
  const camelCaseStr = StringUtil.camelCase('hello-world')

  result.value = `
    数字相加: ${sum}
    格式化日期: ${formattedDate}
    驼峰命名: ${camelCaseStr}
  `
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  margin-bottom: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

pre {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style> 