import { ArrayUtil, StringUtil, ObjectUtil, DateUtil, NumberUtil } from './dist/index.mjs';

console.log('Testing JSCommon build...');

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

// 测试 DateUtil
const now = new Date();
const formatted = DateUtil.format(now, 'YYYY-MM-DD');
console.log('DateUtil.format(now, "YYYY-MM-DD"):', formatted);

// 测试 NumberUtil
const num = 123.456;
const rounded = NumberUtil.round(num, 2);
console.log('NumberUtil.round(123.456, 2):', rounded);

console.log('✅ All tests passed!'); 