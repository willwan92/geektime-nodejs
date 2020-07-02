
function game(playerAction) {
	var random = Math.random() * 3;
	var computerAction = '石头';
	var res = {
		msg: '',
		code: null
	};

	if (random > 2) {
		computerAction = '布';
	} else if (random < 1) {
		computerAction = '剪刀';
	}

	res.msg += `电脑：${computerAction}<br/>`;
	res.msg += `你：${playerAction}<br/>`

	if (playerAction === computerAction) {
		res.msg += '平局<br/>';
		res.code = 0;
	} else if (
		(playerAction === '剪刀' && computerAction === '布') ||
		(playerAction === '布' && computerAction === '石头') ||
		(playerAction === '石头' && computerAction === '剪刀')
	) {
		res.msg += '恭喜，你赢了！<br/>';
		res.code = 1;
	} else {
		res.msg += '真遗憾，你输了！<br/>';
		res.code = -1;
	}

	return res;
}

exports.game = game;

