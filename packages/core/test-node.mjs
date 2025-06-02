// 只导入不依赖浏览器环境的工具类
import { ArrayUtil, StringUtil, ObjectUtil, CollectionUtil, FunctionUtil, NumberUtil } from './dist/index.mjs';

console.log('Testing JSCommon build (Node.js compatible modules)...');

// 测试 ArrayUtil
const testArray = [1, 2, 3, 4, 5];
const chunked = ArrayUtil.chunk(testArray, 2);
console.log('ArrayUtil.chunk([1,2,3,4,5], 2):', chunked);

// 测试 StringUtil
const testString = 'hello world';
const camelCase = StringUtil.camelCase(testString);
console.log('StringUtil.camelCase("hello world"):', camelCase);

// 测试 ObjectUtil
const testObj = { a: 1, b: 2, c: 3 };
const keys = ObjectUtil.keys(testObj);
console.log('ObjectUtil.keys({a:1,b:2,c:3}):', keys);

// 测试 CollectionUtil
const collection = [1, 2, 3, 4, 5];
const filtered = CollectionUtil.filter(collection, n => n > 3);
console.log('CollectionUtil.filter([1,2,3,4,5], n => n > 3):', filtered);

// 测试 FunctionUtil
const add = (a, b) => a + b;
const throttled = FunctionUtil.throttle(add, 100);
console.log('FunctionUtil.throttle created successfully');

// 测试 NumberUtil
const num = 123.456;
const rounded = NumberUtil.round(num, 2);
console.log('NumberUtil.round(123.456, 2):', rounded);

console.log('✅ All Node.js compatible tests passed!'); 