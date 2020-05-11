# NodeJs 模块

NodeJs 使用 CommonJs 模块规范。CommonJs 规范由JavaScript社区发起，在Node.js上应用并推广。

## NodeJs 模块分类

- 核心模块（在node启动时会预先加载）
- 非核心模块 （包括：文件模块、第三方模块）

## 模块引用

- 通过路径

		var promise = require('../fileName.js'); 

- 通过模块名

		var promise = require('http');

## 模块化开发

1. 创建和定义模块

	在 NodeJs 中，只需要创建一个js文件就创建了一个模块，通过在 exports 变量上添加属性和方法就可以在向外部暴露想要暴露的数据和方法。

		// utils.js
		exports.sum = function (a, b) {
			return a + b;
		};

		exports.msg = 'hello world';

2. 使用模块

	我们可以通过 require 方法来引用一个模块，然后就可以使用这个模块暴露出来的数据和方法。

		// index.js
		var utils = require('./utils.js');

		var res = utils.sum(1, 2);
		console.log(res); // 输出 3

## CommonJs 模块机制

### 模块默认导出对象字面量 {}

		// utils.js
		console.log(exports); // 输出 {}

		// index.js
		var utils = require('./utils.js');
		console.log(utils); // 输出 {}

### 修改模块默认导出数据为其他类型

通过给 module.exports 赋值可以修改模块导出的数据为字符串、函数等其他任何类型。

例如：

		// utils.js
		exports.sum = function (a, b) {
			return a + b;
		};

		module.exports = function hello() { 
			console.log('hello');
		}

		setTimeout(() => {
			console.log(exports); // 输出： { sum: [Function] }
		}, 200);

		// index.js
		var utils = require('./utils');

		console.log(utils); // 输出：[Function: hello]

这就说明 module.exports 覆盖了默认的 exports 变量，但是原来默认的 exports 变量在模块内部还存在。

### 模块内部的 exports 变量和模块的使用者 require 的对象是同一个引用

CommonJs 规范中，模块内部的 exports 变量和模块的使用者 require 的对象是同一个引用。这就说明，在模块外部，可以修改模块暴露出来的对象。

例如：在 index.js 中引用 utils 模块。并给他添加一个属性 additional ,

	// index.js
	var utils = require('./utils');

	utils.additional = '模块的使用者添加的属性';

	utils.sum = '改变模块内部原有的属性';

在 utils.js 中，延迟 200ms 打印 exports 变量，

	// utils.js
	exports.sum = function (a, b) {
		return a + b;
	};

	setTimeout(() => {
		console.log(exports); // { sum: '改变模块内部原有的属性', additional: '模块的使用者添加的属性' }
	}, 200);

在终端运行 index.js，输出：{ sum: '改变模块内部原有的属性', additional: '模块的使用者添加的属性' }。


		



