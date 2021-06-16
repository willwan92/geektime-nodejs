## 创建模板渲染函数实现过程：

1. 根据模板路径读取模板文件得到模板字符串

```js
const str = fs.readFileSync(tplPath)
// 例如：const str = '<p>${data}</p>'
```


2. 根据原始字符串生成ES6模板字符串格式的字符串

```js
`\`${str}\``
//返回 '`<p>${data}</p>`'
```

3. 因为我们最终要返回一个函数，所以我们先创建一个匿名函数的字符串形式，这个匿名函数返回es6模板字符串

```js
const funcStr = `(function (data) {
  return \`${str}\`
})`

// 上述代码返回如下字符串：
'(function (data) { 
  return `<p>${data}</p>`
})'
```

4. 利用runInContext运行匿名函数字符串funcStr，生成返回es6模板字符串的匿名函数

```js
vm.runInContext(funcStr, vm.createContext({}))
```

**完整代码如下：**

```js
function createTemplateRender(tplPath) {
  const str = fs.readFileSync(tplPath)
  const funcStr = `(function (data) {
    return \`${str}\`
  })`
  return vm.runInContext(funcStr, vm.createContext({}))
}
```