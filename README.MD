# All API Hub Sync to Gist

一个轻量级的 Node.js HTTP 服务，用于将 All API Hub 数据同步到 GitHub Gist。该服务提供简单的 HTTP 接口，自动管理 Gist 的创建和更新。

## 功能特性

- 自动创建或更新 GitHub Gist
- 支持 Base64 编码存储数据
- RESTful API 接口
- Docker 容器化部署
- 轻量级，基于 Node.js 原生 HTTP 模块

## 技术栈

- **Runtime**: Node.js 20
- **HTTP Server**: Node.js 原生 `http` 模块
- **HTTP Client**: Axios
- **容器化**: Docker (Alpine Linux)

## 快速开始

### 前置要求

- Node.js 20+
- GitHub Personal Access Token (需要 `gist` 权限)

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd all-api-hub-sync2gist
```

2. 安装依赖
```bash
npm install
```

3. 启动服务
```bash
npm start
```

服务将在 `http://localhost:12001` 启动

### Docker 部署

1. 构建镜像
```bash
docker build -t all-api-hub-sync2gist .
```

2. 运行容器
```bash
docker run -p 12001:12001 all-api-hub-sync2gist
```

## API 使用说明

### 1. 上传数据到 Gist

**请求**
```http
PUT /{github_token}
Content-Type: application/json

{
  "your": "data"
}
```

**说明**
- 将 `{github_token}` 替换为您的 GitHub Personal Access Token
- 请求体为要存储的 JSON 数据
- 数据将以 Base64 编码存储在 Gist 中

**响应**
- `200 OK`: 上传成功

### 2. 获取 Gist 数据

**请求**
```http
GET /{github_token}
```

**说明**
- 将 `{github_token}` 替换为您的 GitHub Personal Access Token
- 返回存储在 Gist 中的原始数据

**响应**
- `200 OK`: 返回 JSON 数据
- `404/500`: 错误信息

### 3. 创建目录（WebDAV 兼容）

**请求**
```http
MKCOL /{github_token}
```

**响应**
- `201 Created`: 目录创建成功

## Gist 配置

- **描述**: `All API Hub to Gist`
- **文件名**: `ALL_AI_HUB.json`
- **可见性**: Private (私有)
- **编码**: Base64

## 项目结构

```
all-api-hub-sync2gist/
├── src/
│   ├── index.js     # HTTP 服务主入口
│   └── func.js      # GitHub Gist API 操作函数
├── Dockerfile       # Docker 镜像配置
├── package.json     # 项目依赖配置
└── README.MD        # 项目文档
```

## 环境变量

当前版本通过 URL 路径传递 GitHub Token。如需更安全的方式，建议使用环境变量：

```bash
GITHUB_TOKEN=your_token_here npm start
```

## 注意事项

1. **安全性**: GitHub Token 在 URL 中传递，请确保使用 HTTPS
2. **Token 权限**: 确保 GitHub Token 具有 `gist` 权限
3. **数据大小**: GitHub Gist 单文件大小限制为 1MB
4. **频率限制**: 遵守 GitHub API 速率限制（认证用户：5000请求/小时）

## 开发

### 添加新功能

1. 在 `src/func.js` 中添加新的 Gist 操作函数
2. 在 `src/index.js` 中添加相应的 HTTP 路由处理

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request。

## 作者

项目由社区维护。

## 更新日志

- **v1.0.0**: 初始版本
  - 支持 Gist 创建和更新
  - 支持数据上传和获取
  - Docker 容器化支持
