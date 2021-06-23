/**
 * 1. 使用 buildSchema 方法，把一个文本格式的 graphql 协议转换成 GraphqlSchema 实例，依赖 graphql
 * 2. 创建rpcClient，用来连接rpc服务（每个client独立成一个模块）
 * 3. 定义获取数据的过程，包含查询评论列表和点赞
 * 4. 暴露出 schema
 */

const { buildSchema  } = require('graphql')
const fs = require('fs')
const schema = buildSchema(fs.readFileSync(`${__dirname}/schema/comment.gql`))

module.exports = schema