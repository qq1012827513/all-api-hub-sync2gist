# 使用官方 Node.js 运行时作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (如果存在)
COPY package*.json ./

# 安装项目依赖
RUN npm ci --only=production

# 复制项目文件
COPY src ./src

# 暴露应用运行的端口
EXPOSE 12001

# 设置非 root 用户运行应用
USER node

# 启动应用
CMD ["npm", "start"]
