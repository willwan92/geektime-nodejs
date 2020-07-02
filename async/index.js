const glob = require('glob')

// console.time('sync')
// // 同步获取指定目录下所有的文件
// const res = glob.sync('../**/*')
// console.timeEnd('sync')

// console.log(res.length);


console.time('async')
// 异步获取指定目录下所有的文件
const res2 = glob('../**/*', (error, result) => {
	console.log(result.length);
	
})
console.timeEnd('async')

console.log('异步在IO完成之前还可以做别的事情');