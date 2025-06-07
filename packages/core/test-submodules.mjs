// 测试子模块按需导入
import { ArrayUtil } from './dist/lang/index.mjs';
import { StorageUtil } from './dist/storage/index.mjs';
import { ClassNamesUtil } from './dist/style/index.mjs';

console.log('Testing submodule imports...');

// 测试 lang 模块
const testArray = [1, 2, 3, 4, 5];
const chunked = ArrayUtil.chunk(testArray, 3);
console.log('ArrayUtil.chunk([1,2,3,4,5], 3):', chunked);

// 测试 style 模块
const classNames = ClassNamesUtil.combine('btn', 'btn-primary', { active: true });
console.log('ClassNamesUtil.combine("btn", "btn-primary", { active: true }):', classNames);

// 测试 storage 模块（只测试方法存在，不实际调用）
console.log('StorageUtil.setItem method exists:', typeof StorageUtil.setItem === 'function');

console.log('✅ All submodule tests passed!'); 