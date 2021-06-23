/**
 * 1. 创建 rpc-client， 依赖easy_sock
 * 2. 根据模型生成生成 schemas , 方便编解码（依赖protocol-buffers）
 * 3. 实现 encode 方法，编码请求参数，返回编码后的buffer
 * 4. 实现 decode 方法，解码返回参数，返回编码后的数据
 * 5. 实现 isReceiveComplete，判断当前数据包是否接收完整
 * 6. 暴露出 rpc-client
 */