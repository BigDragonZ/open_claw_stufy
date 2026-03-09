# 02. OpenClaw 的多语言协同：MCP 架构解析

## 1. 为什么用 Python 扩展 Node.js Agent？
大模型时代的最佳实践是：**网关用 Node/Go，算力用 Python。**
OpenClaw 负责维持与微信、Telegram、终端的 WebSocket 长连接，当 Agent 决定需要执行复杂数学运算或操作本地文件时，它会通过 MCP (Model Context Protocol) 协议向后端的 Python 进程发送执行请求。

## 2. MCP (模型上下文协议) 的核心组件
* **Resources (资源)**：Python 暴露给 Agent 的只读数据（比如读取 `ai_study` 里的 `.md` 笔记内容）。
* **Tools (工具)**：Python 暴露给 Agent 的可执行函数。例如，Agent 思考后决定调用 Python 脚本来执行一次梯度下降的参数更新：
  $$
  \theta_{j} := \theta_{j} - \alpha \frac{\partial}{\partial \theta_{j}} J(\theta)
  $$
* **Prompts (提示词模板)**：Python 动态生成的上下文片段。

## 3. 通讯方式
我们不需要写复杂的 HTTP API，使用 `stdio`（标准输入输出）模式即可。OpenClaw 会作为父进程直接唤起我们的 Python 脚本，通过控制台管道进行 JSON-RPC 级的高速通讯。
