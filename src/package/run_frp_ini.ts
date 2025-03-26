import * as path from 'path';
import * as fs from 'fs';
import { spawn } from 'child_process';

/**
 * 运行 frpc 命令
 */
export function runFrpIni(): void {
  // 指定 frp 目录的路径
  const rootDir = path.resolve(__dirname, '../../');
  const frpDir = path.join(rootDir, 'frp');

  try {
    // 检查 frp 目录是否存在
    if (!fs.existsSync(frpDir)) {
      console.log(`错误：找不到指定的目录。请确保路径 '${frpDir}' 正确。`);
      return;
    }

    // 检查 frpc 可执行文件是否存在
    const frpcPath = path.join(frpDir, 'frpc');
    if (!fs.existsSync(frpcPath)) {
      console.log(`错误：找不到 frpc 可执行文件。请确保文件 '${frpcPath}' 存在。`);
      return;
    }

    console.log("frp已经跑起来了，现在可以尝试远程连接");

    // 切换到 frp 目录并执行命令
    const frpc = spawn('sudo', ['./frpc', '-c', 'frpc.ini'], {
      cwd: frpDir,
      stdio: 'inherit'
    });

    // 处理 frpc 进程的事件
    frpc.on('error', (error) => {
      console.log(`命令执行失败。错误信息：${error.message}`);
    });

    frpc.on('exit', (code) => {
      if (code !== 0) {
        console.log(`frpc 进程异常退出，退出码: ${code}`);
      } else {
        console.log("frpc 进程已退出");
      }
    });

    // 确保进程终止时清理子进程
    process.on('SIGINT', () => {
      frpc.kill('SIGINT');
      process.exit();
    });

    process.on('SIGTERM', () => {
      frpc.kill('SIGTERM');
      process.exit();
    });

  } catch (error) {
    if (error instanceof Error) {
      console.log(`发生错误：${error.message}`);
    } else {
      console.log(`发生未知错误：${error}`);
    }
  }
} 
