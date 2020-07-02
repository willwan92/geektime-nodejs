const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const { game } = require('../game.js');

let playerLastAction;
let repeatCount = 0;
let lastResult = 0;
let count = 0; // 玩家连续赢的次数

http
	.createServer(function (req, res) {
		const urlObj = url.parse(req.url);
		const query = querystring.parse(urlObj.query);

		if (urlObj.pathname === '/') {
			res.writeHead(200);
			fs.createReadStream(__dirname + '/index.html').pipe(res);
		}

		if (urlObj.pathname === '/game') {

			// 玩家出重复的情况
			if (query.action === playerLastAction) {
				repeatCount ++;
			} else {
				repeatCount = 0;
			}
			playerLastAction = query.action;
			
			if (repeatCount > 3) {
				res.writeHead(400);
				res.end("你老是出重复的，俺不跟你玩了！<br/>");

				return;
			}

			let result = game(query.action);
			lastResult = result.code;

			// 玩家连续赢得情况
			if (result.code === 1 && lastResult === 1) {
				count ++;
			} else {
				count = 0;
			}

			if (count > 3) {
				res.writeHead(500);
				res.end("你太厉害了，俺不跟你玩了！<br/>");
				return;
			} else {
				res.writeHead(200);
				res.end(result.msg);
			}
		}
	})
	.listen(3000);