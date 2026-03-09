// codes/01_basic_agent.js
import { Agent } from 'openclaw';
import 'dotenv/config';

async function main() {
    console.log("===================================");
    console.log("🦞 启动 OpenClaw 测试 Agent");
    console.log("===================================\n");

    // 实例化 Agent，定义 System Prompt
    const myAgent = new Agent({
        name: "ResearchBot",
        model: "gpt-4o-mini", // 这里先用通用云端模型测试连通性
        systemPrompt: "你是一个严肃的AI安全与机器学习算法研究员。回答需结构化，包含原理分析。"
    });

    const userTask = "简述梯度下降算法中学习率(alpha)设置过大或过小对损失函数 J(theta) 的具体影响。";
    console.log(`[Task Input]: ${userTask}\n`);

    // 记录开始时间以测算推理延迟
    const startTime = Date.now();
    
    // 运行 Agent
    const response = await myAgent.run(userTask);
    
    const endTime = Date.now();

    console.log(`[Agent Output] (${(endTime - startTime) / 1000}s):\n`);
    console.log(response);
}

main().catch(console.error);
