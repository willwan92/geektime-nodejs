const app = require("./app");
const fs = require("fs");
const { game } = require("../../game");

let playerLastAction; // 玩家上次出的手势
let repeatCount = 1; // 玩家连续重复出一个手势的次数
let lastResult = 0; // 上次游戏的结果
let count = 0; // 玩家连续赢的次数

/**
 * express 中间件：
 * 1. express 支持中间件，可以给请求指定多个回调函数。通过调用 next 方法，执行下一个回调函数。
 * 2. express 中间件的实现符合洋葱模型，在所有的回调函数依次执行后，还会倒序依次执行回调函数 next 方法后的代码。这样的机制便于：在前面的后调函数里执行需要使用后续的回调函数执行结果的程序。
 *
 * express 中间件的问题：回调函数内不能执行异步程序。因为异步程序和其他代码处于不同的事件循环，后续的代码不会等待异步程序执行完就先执行了，所以会出现执行顺序和预想不一致的问题。
 */

/**
 * 游戏逻辑
 */
app.get(
  "/game",
  /**
   * 重新开始
   */
  (req, res, next) => {
    const query = req.query;

    if (query.action === "reset") {
      playerLastAction = undefined;
      count = 0;
      repeatCount = 1;
      lastResult = 0;
      res.status(200);
      res.send("重置成功，请继续！<br/>");
      return;
    }

    next();
  },
  /**
   * 判断玩家连续赢
   */
  (req, res, next) => {
    if (count > 1) {
      res.status(500);
      res.send("你连续赢了2次，太厉害了，俺不跟你玩了！<br/>");
      return;
    }

    next();
  },
  /**
   * 判断玩家重复出同一个手势
   */
  (req, res, next) => {
    const query = req.query;

    if (query.action === playerLastAction && repeatCount > 2) {
      res.status(400);
      res.send("你老是出重复的，俺不跟你玩了！<br/>");
      return;
    }

    next();
  },
  /**
   * 统计玩家连续赢的次数
   */
  (req, res, next) => {
    next();

    const result = res.result;
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
  },
  /**
   * 统计玩家手势重复的次数
   */
  (req, res, next) => {
    const query = req.query;

    if (query.action === playerLastAction) {
      repeatCount++;
    } else {
      repeatCount = 1;
    }

    playerLastAction = query.action;

    next();
  },
  /**
   * 游戏正常进行
   */
  async (req, res) => {
    const query = req.query;
    const result = game(query.action);

    res.result = result;
    res.status(200);
    res.send(result.msg);
  }
);
