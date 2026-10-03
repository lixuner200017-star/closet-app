# 我的数字衣橱 · 使用说明

## 这是什么

一个**完整的 PWA 衣橱管理应用**——拍照导入、AI 自动识别、多维度筛选、穿搭统计。可以安装到手机主屏幕像 App 一样使用，数据完全存储在本地，离线也能用。

---

## 三步开始用

### 1. 起本地服务器

电脑终端运行：

```bash
cd closet-app
python3 -m http.server 8080
```

### 2. 手机访问

- 电脑查 IP：`ifconfig | grep inet`（Mac）/ `ipconfig`（Win），找类似 `192.168.x.x`
- 手机浏览器打开：`http://192.168.x.x:8080`

### 3. 安装到主屏幕

- **iOS**：Safari 打开 → 底部分享按钮 → "添加到主屏幕"
- **Android**：Chrome 打开 → 菜单 → "安装应用"

---

## 配置 AI 真实识别（强烈推荐）

应用默认用**模拟识别**（随机属性）。配置后可启用**真实 AI 视觉识别**，**完全免费**：

### 获取智谱 API Key

1. 打开 https://bigmodel.cn 注册账号
2. 进入 https://bigmodel.cn/usercenter/proj-mgmt/apikeys
3. 点击"添加新的 API Key" → 复制

### 在应用里填入

1. 打开应用 → 底部「设置」Tab
2. 点击「AI 识别引擎」
3. 粘贴 API Key → 点「测试连接」验证
4. 「保存」

之后拍照导入时会**真实调用 AI** 识别衣物的类别、颜色、长度、版型、材质、季节等属性。

---

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | 原生 HTML + CSS + JS（无框架，零依赖） |
| 数据存储 | IndexedDB（浏览器本地数据库） |
| 离线 | Service Worker + Cache API |
| 安装 | PWA（manifest.json + icons） |
| AI | 智谱 GLM-4V-Flash（免费，OpenAI 兼容格式） |
| 图片 | 摄像头 getUserMedia + Canvas 压缩 |

---

## 文件结构

```
closet-app/
├── index.html       # 主应用（HTML + CSS + JS 全在一个文件）
├── manifest.json    # PWA 安装配置
├── sw.js            # Service Worker（离线缓存）
├── icon-192.png     # 应用图标
└── icon-512.png     # 应用图标（高清）
```

---

## 功能清单

- ✅ 拍照导入（调用真实摄像头）
- ✅ 相册选图导入
- ✅ AI 自动识别（智谱 GLM-4V-Flash，免费）
- ✅ 手动编辑所有属性
- ✅ 多维度筛选（类别 × 颜色 × 长短 × 版型）
- ✅ 单品详情 + 穿着记录
- ✅ 闲置预警（>90 天未穿自动标记）
- ✅ 穿着频次统计 TOP5
- ✅ 类别分布环形图
- ✅ 本月花费统计
- ✅ 数据导出/导入（JSON 备份）
- ✅ 安装到手机主屏幕
- ✅ 离线使用

---

## 后续路线

- **乙方案**：React Native 原生 App（为上架 App Store / 应用市场做准备）
- 穿搭推荐功能（基于已有衣物做组合）
- 真实衣物图片云存储（可选）

需要继续开发时告诉我。
