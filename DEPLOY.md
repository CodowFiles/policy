# 部署说明

## GitHub Pages 部署步骤

### 1. 创建GitHub仓库

1. 登录GitHub账号
2. 点击右上角 "+" → "New repository"
3. 仓库名称建议：`policy-assembly-2026`
4. 选择 "Public"（公开）或 "Private"（私有）
5. 点击 "Create repository"

### 2. 推送代码到GitHub

在本地项目目录执行以下命令：

```bash
# 初始化git仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 2026年政策文件汇编"

# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/policy-assembly-2026.git

# 推送代码
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单选择 "Pages"
4. "Source" 选择 "GitHub Actions"
5. 系统会自动识别 `.github/workflows/deploy.yml` 并开始部署

### 4. 访问网站

部署完成后，在 "Pages" 设置页面会显示网站链接，格式为：
`https://YOUR_USERNAME.github.io/policy-assembly-2026/`

## 文件说明

### 项目结构
```
policy-assembly/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── app.js              # 应用逻辑
├── data.js             # 政策数据
├── documents/          # HTML格式政策文件
├── pdfs/               # PDF扫描版文件
├── .github/workflows/  # GitHub Actions配置
└── README.md           # 项目说明
```

### 政策文件对应关系

| 序号 | 文件名 | 文字版 | 扫描版 |
|------|--------|--------|--------|
| 01 | 翻牌店政策与提成方案 | Excel | - |
| 02 | 限时新开店政策及提成 | Excel | - |
| 03 | 新可多标准店紧密型加盟模式3.0 | HTML | PDF |
| ... | ... | ... | ... |
| 17 | 开店提成方案2.0 | - | PDF |
| ... | ... | ... | ... |

## 更新内容

如需更新政策内容：

1. **更新文字版**：修改 `documents/` 目录下对应的HTML文件
2. **更新扫描版**：替换 `pdfs/` 目录下对应的PDF文件
3. **更新排序或信息**：修改 `data.js` 文件
4. **提交更新**：
   ```bash
   git add .
   git commit -m "更新政策内容"
   git push
   ```

GitHub Actions会自动重新部署网站。

## 注意事项

1. PDF文件较大，首次克隆可能需要一些时间
2. 建议使用Git LFS管理大文件（如果PDF很多）
3. 私有仓库的GitHub Pages也有访问限制，请注意
4. 如使用自定义域名，请在仓库设置中配置

## 本地预览

直接在浏览器中打开 `index.html` 即可本地预览，无需服务器。

或者使用简单的HTTP服务器：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

然后访问 `http://localhost:8000`
