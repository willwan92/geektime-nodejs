// 用ES6模板字符串实现一个简易模板引擎
const vm = require('vm')
const fs = require('fs')

/**
 * 目标：
 * 1. 返回一个模板函数，调用模板函数并传入数据可以返回插好数据的html字符串
 * 2. 实现一个include函数，在一个模板里可以include另一个模板
 */

const context = vm.createContext([{
  include: () => {

  }
}])

// const createTemplate = function (path) {
//   const template = fs.readFileSync(path)
//   function (data) {
//     return `<h1>${data.title}</h1>`
//   }
//   return vm.runInContext(`(function () {
//     return `${template}`
//   })`,)
// }


/**
 * 创建模板渲染函数
 * @param {String} tplPath 
 * @returns {Function} 
 */
function createTemplateRender(tplPath) {
  const str = fs.readFileSync(tplPath)
  const tplStr = `(function (data) {
    return \`${str}\`
  })`
  return vm.runInContext(tplStr, context)
}

/**
 * 创建模板渲染函数实现原理：
 * 1. 实现一个可以返回模板字符串的匿名函数
 * 2. 根据模板文件路径读取模板文件得到字符串
 * 3. 根据字符串生成ES6模板字符串
 * 4. 实现根据不同的模板字符串生成不同的模板渲染函数
 */

// 1. 实现一个可以返回ES6模板字符串的匿名函数
(function (data) {
  const tplStr = `<p>${data}</p>`
  return tplStr
})

// 2. 根据模板路径读取模板文件得到模板字符串
const str = fs.readFileSync(tplPath)

// 3. 根据模板字符串生成ES6模板字符串
const tplStr = `\`${str}\``

// 4. 实现根据不同的模板字符串生成不同的模板渲染函数
function createTemplateRender(tplPath) {
  const str = fs.readFileSync(tplPath)
  const funcStr = `(function (data) {
    return \`${str}\`
  })`
  return vm.runInContext(funcStr, context)
}























// const context = vm.createContext({})
// const createTemplate = function (str) {
//   return vm.runInContext(`(function render(data) {
//     return \`${str}\`
//   })`, context)
// }

// const tpl = createTemplate('<h1>${data.title}</h1>')
// console.log(tpl.toString());

// vm: 虚拟机
/**
 * vm.createContext([contextObject[, options]])
 * 用给定的上下文对象 contextObject 对象创建一个沙盒，从而让它具备在 vm.runInContext() 或者 script.runInContext() 中被使用的能力。 在runInContext运行的脚本中，contextObject 将会是全局对象，保留其所有现有属性，但还具有标准的全局对象具有的内置对象和函数。
 */

/**
 * vm.runInContext(code, contextifiedObject[, options])
vm.runInContext() 方法会编译 code，然后在指定的 contextifiedObject 的上下文里执行它并返回其结果。 被执行的代码无法获取本地作用域。
 */
