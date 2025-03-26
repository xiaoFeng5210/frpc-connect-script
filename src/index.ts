import { Command } from 'commander';
import clipboardy from 'clipboardy';
import { device_match_password } from './config/password';
import { createFrpIni } from './package/file';
import { runFrpIni } from './package/run_frp_ini';

let currentDevice = '';
let currentPassword = '';

const program = new Command();

program
  .name('frpc-connect')
  .description('frpc 远程连接工具')
  .version('1.0.0')
  .argument('<device_name>', '设备名称')
  .action((deviceName: string) => {
    // 检查设备名称是否在设备匹配密码字典中
    if (deviceName in device_match_password) {
      // 如果设备名称在字典中，则获取密码和描述信息
      const findObj = device_match_password[deviceName];
      const password = findObj.password;
      const desc = findObj.desc || '';
      const dealer = findObj.dealer || '';

      if (password) {
        console.log(`设备名称: ${deviceName}, 密码: ${password}${desc ? `, 描述: ${desc}` : ''}${dealer ? `, 经销商: ${dealer}` : ''}`);
        
        currentDevice = deviceName;
        currentPassword = password;
        
        // 修改配置文件
        createFrpIni(deviceName);
        
        // 复制密码到剪贴板
        try {
          clipboardy.writeSync(password);
          console.log('设备密码已复制到剪贴板!');
        } catch (error) {
          console.log('复制密码到剪贴板失败，请手动复制密码。');
        }
        
        // 运行 frpc
        runFrpIni();
      } else {
        console.log(`未找到设备密码，请联系管理员添加设备以及密码`);
      }
    } else {
      console.log(`目前无法找到 ${deviceName}, 请检查设备名称是否正确`);
    }
  });

program.parse(process.argv);

// 如果没有提供参数，显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
} 
