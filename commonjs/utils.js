// utils.js

exports.sum = function (a, b) {
	return a + b;
};

module.exports = function hello() { 
	console.log('hello');
}

setTimeout(() => {
	console.log(exports); // { sum: [Function] }
}, 200);