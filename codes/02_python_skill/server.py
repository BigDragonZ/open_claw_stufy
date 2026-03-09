# codes/02_python_skill/server.py
from mcp.server.fastmcp import FastMCP

# 1. 实例化一个 MCP 服务器
mcp = FastMCP("DragonStudyTool")

# 2. 使用装饰器将 Python 函数暴露给 OpenClaw Agent
@mcp.tool()
def calculate_gradient_step(theta: float, alpha: float, gradient: float) -> str:
    """
    核心算法工具：计算单步梯度下降的参数更新结果。
    
    Args:
        theta: 当前的参数值
        alpha: 学习率 (Learning Rate)
        gradient: 当前的损失函数梯度
    """
    new_theta = theta - alpha * gradient
    
    # 这里的返回值会被直接投喂给大模型进行下一轮思考
    return f"[Python底层计算完毕] 参数已更新。旧值={theta}, 学习率={alpha}, 梯度={gradient} -> 新值={new_theta}"

if __name__ == "__main__":
    # 3. 以 stdio 模式运行，等待 OpenClaw 唤醒并建立管道通信
    mcp.run(transport='stdio')
