const { game } = require('./game');

// process.argv 获取nodejs进程中的参数
// var playerAction = process.argv[2];

let count = 0;

process.stdin.on('data', e => {
	const playerAction = e.toString().trim();
	const result = game(playerAction);

	if (result === 1) {
		count ++;
	}

	if (count === 3) {
		console.log('你太厉害了，我不玩了！');
		// 杀掉进程
		process.exit();
	}	
})


