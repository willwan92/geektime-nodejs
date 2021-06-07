const { game } = require("../../game");

/**
 * next方法：当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。
 */

function gameKoaUse(gameKoa) {
  let playerLastAction; // 玩家上次出的手势
  let repeatCount = 1; // 玩家连续重复出一个手势的次数
  let lastResult = 0; // 上次游戏的结果
  let count = 0; // 玩家连续赢的次数

  // 重新开始
  gameKoa.use(async function (ctx, next) {
    const query = ctx.request.query;
    if (query.action === "reset") {
      playerLastAction = undefined;
      count = 0;
      repeatCount = 1;
      lastResult = 0;
      ctx.status = 200;
      ctx.body = "重置成功，请继续！<br/>";
    } else {
      await next();
    }
  })

  // 判断玩家连续赢
  gameKoa.use(async (ctx, next) => {
    if (count > 1) {
      ctx.status = 200;
      ctx.body = "你连续赢了2次，太厉害了，俺不跟你玩了！<br/>";
    } else {
      await next();
    }
  })

  // 判断玩家重复出同一个手势
  gameKoa.use(async (ctx, next) => {
    const query = ctx.request.query;

    if (query.action === playerLastAction && repeatCount > 2) {
      ctx.status = 400;
      ctx.body = "你老是出重复的，俺不跟你玩了！<br/>";
    } else {
      await next();
    }
  })

  // 统计玩家连续赢的次数
  gameKoa.use(async (ctx, next) => {
    await next();
    
    const result = ctx.response.body;
    // 统计玩家连续赢的次数
    if (result.code !== 1) {
      // 玩家输
      count = 0;
    } else {
      if (lastResult !== 1) {
        // 玩家第一次赢
        count = 1;
      } else {
        // 玩家连续赢
        count++;
      }
    }

    lastResult = result.code;
  })

  // 统计玩家手势重复的次数
  gameKoa.use(async (ctx, next) => {
    const query = ctx.request.query;

    if (query.action === playerLastAction) {
      repeatCount++;
    } else {
      repeatCount = 1;
    }

    playerLastAction = query.action;

    await next();
  })

  // 游戏正常进行
  gameKoa.use((ctx) => {
    const query = ctx.request.query;
    const result = game(query.action);
    ctx.status = 200;
    ctx.body = result;
  })
}

module.exports = gameKoaUse;