import * as path from 'path';
import * as fs from 'fs';
import * as ini from 'ini';

/**
 * 获取 frpc.ini 文件路径
 * @returns 返回 frpc.ini 文件的绝对路径
 */
function createFilePath(): string {
  // 获取当前脚本所在目录
  const currentDir = __dirname;
  // 获取项目根目录
  const rootDir = path.resolve(currentDir, '../../');
  // frpc.ini 文件路径
  const frpcPath = path.join(rootDir, 'frp', 'frpc.ini');
  return frpcPath;
}

/**
 * 修改 frpc.ini 文件中的 server_name
 * @param filePath frpc.ini 文件路径
 * @param newServerName 新的设备名称
 */
function modifyFrpIni(filePath: string, newServerName: string): void {
  try {
    // 读取 INI 文件内容
    const iniContent = fs.readFileSync(filePath, 'utf-8');
    // 解析 INI 内容为对象
    const config = ini.parse(iniContent);

    // 检查 secret_ssh_visitor 部分是否存在
    if (config.secret_ssh_visitor) {
      config.secret_ssh_visitor.server_name = 'ssh_' + newServerName;
    } else {
      console.log("警告: 'secret_ssh_visitor' 部分不存在");
    }

    // 将修改后的配置写回文件
    fs.writeFileSync(filePath, ini.stringify(config));
    console.log(`成功修改 '${filePath}' 文件`);
  } catch (error) {
    if (error instanceof Error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.log(`错误：文件 '${filePath}' 不存在。`);
      } else {
        console.log(`发生错误：${error.message}`);
      }
    } else {
      console.log(`发生未知错误：${error}`);
    }
  }
}

/**
 * 创建/修改 frpc.ini 文件
 * @param deviceName 设备名称
 */
export function createFrpIni(deviceName: string): void {
  const filePath = createFilePath();
  modifyFrpIni(filePath, deviceName);
} 
