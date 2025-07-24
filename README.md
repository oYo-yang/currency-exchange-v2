# Currency Exchange API

hi, this repo is only for training!

## 环境变量配置（.env）

1. 在项目根目录下新建 `.env` 文件，内容如下（可直接复制）：

```env
DB_HOST=localhost
DB_PORT=port
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=currency
JWT_SECRET=your_jwt_secret
```

2. 变量说明：

- `DB_HOST`：数据库主机地址（如本地为 localhost）
- `DB_USER`：数据库用户名（如 root）
- `DB_PASSWORD`：数据库密码
- `DB_NAME`：数据库名（如 currency）
- `JWT_SECRET`：JWT 签名密钥（请自行设置安全值）

3. **安全提示**：

- `.env` 文件包含敏感信息，请勿提交到 git 仓库。
- `.env` 已在 `.gitignore` 中配置忽略。

---

## 启动项目

1. 安装依赖：

```bash
npm install
```

2. 启动服务：

```bash
npm start
```

3. 访问 Swagger 文档：

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 其他说明

- 数据库表结构请参考 `docs/createTable.sql`
- API 文档请参考 `docs/swagger.yaml`
