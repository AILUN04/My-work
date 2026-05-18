# 个人作品集网站 - 设计方案

**日期**: 2026-05-08  
**项目名**: Ding Rongxin Portfolio  
**技术栈**: Vue 3 + Vite + Vue Router 4 + Pure CSS

---

## 1. 设计系统

### 1.1 配色方案 — Monochrome Professional + Blue Accent

| 角色 | 颜色 | 色值 | 用途 |
|------|------|------|------|
| Primary | 深黑灰 | `#18181B` | 主文字、标题 |
| Secondary | 中灰 | `#3F3F46` | 辅助文字 |
| CTA/Accent | 蓝色 | `#2563EB` | 链接、高亮、导航激活态 |
| Background | 近白 | `#FAFAFA` | 页面背景 |
| Text | 极黑 | `#09090B` | 正文文字 |
| Border | 浅灰 | `#E4E4E7` | 卡片边框 |
| Shadow | 灰 | `rgba(0,0,0,0.08)` | 卡片阴影 |

### 1.2 UI 风格 — Minimalism + Swiss Style + Bento Grid

- **基础风格**: Minimalism & Swiss Style — 大面积留白、网格布局、功能性至上
- **卡片布局**: Bento Box Grid — 模块化卡片、尺寸统一、清晰层级
- **卡片规范**: 正方形、无圆角 (`border-radius: 0`)、平直边缘、柔和阴影
- **动画**: 页面切换向下渐隐渐显（Vue Router transition）、hover 阴影加深+轻微上浮

### 1.3 字体搭配

- **英文标题**: Space Grotesk (Google Fonts)
- **英文正文**: Archivo (Google Fonts)
- **中文内容**: Noto Sans SC (Google Fonts)
- **后备字体**: system-ui, -apple-system, sans-serif

### 1.4 CSS 变量定义









```css
:root {
  --color-primary: #18181B;
  --color-secondary: #3F3F46;
  --color-accent: #2563EB;
  --color-bg: #FAFAFA;
  --color-text: #09090B;
  --color-border: #E4E4E7;
  --color-shadow: rgba(0, 0, 0, 0.08);
  --color-shadow-hover: rgba(0, 0, 0, 0.15);
  --font-heading: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  --font-body: 'Archivo', 'Noto Sans SC', sans-serif;
  --nav-height: 64px;
  --card-radius: 0px;
  --transition-speed: 300ms;
}
```

---

## 2. 项目结构

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── HomePage.vue
│   │   ├── ProjectsPage.vue
│   │   ├── ExperiencePage.vue
│   │   └── ContactPage.vue
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── ProjectCard.vue
│   │   ├── CategoryTabs.vue
│   │   └── PageTransition.vue
│   ├── data/
│   │   ├── projects.js
│   │   └── experiences.js
│   └── assets/
│       └── styles/
│           ├── variables.css
│           └── global.css
└── public/
    └── images/
        └── (placeholder images)
```

---

## 3. 页面路由

| 路径 | 组件 | 导航标题 |
|------|------|----------|
| `/` | HomePage | 主页 |
| `/projects` | ProjectsPage | 项目 |
| `/experience` | ExperiencePage | 经验能力 |
| `/contact` | ContactPage | 联系我 |

页面切换动画：向下渐隐 + 渐显（opacity + translateY transition 300ms）

---

## 4. 组件设计

### 4.1 NavBar
- 固定顶部 `position: fixed; top: 0; z-index: 100`
- 横向排列: 主页 → 项目 → 经验能力 → 联系我
- 当前页高亮（蓝色下划线 `#2563EB`）
- 高度 64px，白色/浅灰背景，底部细边框

### 4.2 ProjectCard
- 正方形 `aspect-ratio: 1/1`
- 无圆角 `border-radius: 0`
- 顶部预览图（占位色块）+ 底部信息区（标题 + 标签）
- 阴影: `0 2px 8px rgba(0,0,0,0.08)`
- Hover: 阴影加深 + `translateY(-4px)` + `transition: 300ms`

### 4.3 CategoryTabs
- 横向排列的标签选项卡
- 选中标签带下划线 + 高亮
- 点击切换对应分类内容

### 4.4 PageTransition
- Vue Router `<router-view v-slot>` 实现
- 离开动画: opacity 1→0 + translateY 0→20px
- 进入动画: opacity 0→1 + translateY -20px→0
- 时长 300ms, ease-out

---

## 5. 页面功能清单

### 5.1 主页 (HomePage)
- [ ] 背景图覆盖页面上 1/3，渐隐过渡到白色区域
- [ ] 向下滚动背景透明度降低
- [ ] 左侧个人信息卡片（1/3 宽，竖长方形，正方形头像右上角）
- [ ] 个人信息：QQ、电话、邮箱、城市、院校
- [ ] 右上标题区：英文主标题 + 副标题
- [ ] 右下作品预览区：8 个预览卡片，3+3+2 排列
- [ ] 预览卡片 hover 放大/高亮

### 5.2 项目页 (ProjectsPage)
- [ ] 分类标签栏：全部项目 / 剪辑作品 / 特效作品 / 摄影作品 / 其他
- [ ] 响应式网格布局：桌面 3-4 列，移动端 1-2 列
- [ ] 项目卡片：正方形预视 + 标题 + 标签
- [ ] 内容与主页 8 个作品联动
- [ ] 标签筛选切换

### 5.3 经验能力页 (ExperiencePage)
- [ ] 分类标签栏：图片·平面设计 / 视频调色·剪辑 / 特效合成
- [ ] 响应式网格布局
- [ ] 能力卡片：正方形 + 预览图 + 标题 + 标签
- [ ] 标签筛选切换

### 5.4 联系我页 (ContactPage)
- [ ] 风景背景图铺满全页，下半渐隐
- [ ] 居中主标题：丁荣鑫
- [ ] 个人信息居中排列（渐隐背景区）
- [ ] 滚动视差效果

---

## 6. 响应式断点

| 断点 | 宽度 | 布局调整 |
|------|------|----------|
| Desktop | >= 1024px | 导航横向，卡片 3-4 列，个人信息卡片 1/3 宽 |
| Tablet | 768-1023px | 卡片 2 列，个人信息卡片等比例缩小 |
| Mobile | < 768px | 卡片 1 列，个人信息卡片全宽，导航可滚动 |

---

## 7. 数据模型

### Project
```js
{
  id: 1,
  title: "作品标题",
  category: "剪辑作品" | "特效作品" | "摄影作品" | "其他",
  tags: ["PR剪辑", "4K", "原创"],
  thumbnail: "/images/placeholder-1.png",
  url: null // 后续可添加详情链接
}
```

### Experience
```js
{
  id: 1,
  title: "能力标题",
  category: "图片·平面设计" | "视频调色·剪辑" | "特效合成",
  tags: ["PS", "平面设计"],
  thumbnail: "/images/placeholder-exp-1.png"
}
```
