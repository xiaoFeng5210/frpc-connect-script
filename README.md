# frpc-connect-script

使用 TypeScript 编写的 frpc 连接脚本，用于快速连接远程设备。

## 功能特点

- 根据设备名称自动查找匹配的密码
- 自动修改 frpc.ini 配置文件
- 自动将密码复制到剪贴板
- 自动运行 frpc 命令进行连接

## 安装

1. 克隆仓库:
```
git clone https://github.com/yourusername/frpc-connect-script.git
cd frpc-connect-script
```

2. 安装依赖:
```
npm install
```

3. 编译 TypeScript:
```
npm run build
```

## 使用方法

```
npm start -- <设备名称>
```

例如:

```
npm start -- Zrd90v
```

## 开发

1. 安装开发依赖:
```
npm install
```

2. 运行开发模式:
```
npm run dev -- <设备名称>
```

## 目录结构

```
.
├── dist/                 # 编译后的 JavaScript 文件
├── src/
│   ├── config/           # 配置文件
│   │   └── password.ts   # 设备密码配置
│   ├── package/          # 功能模块
│   │   ├── file.ts       # 文件处理模块
│   │   └── run_frp_ini.ts # frpc 执行模块
│   └── index.ts          # 入口文件
├── frp/                  # frp 相关文件
│   ├── frpc              # frpc 可执行文件
│   └── frpc.ini          # frpc 配置文件
├── package.json
├── tsconfig.json
└── README.md
```

## 许可证

[ISC](LICENSE)
