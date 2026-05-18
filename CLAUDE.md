# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**对话语言：所有回复、思考和代码注释均使用中文。**

## 项目概述

丁荣鑫个人作品集网站，4 页面单页应用（SPA）。

## 技术栈

- Vue 3 (Composition API) + Vite + Vue Router 4
- 纯 CSS（CSS Variables + CSS Grid/Flexbox），不引入 UI 框架
- 字体：Space Grotesk / Archivo / Noto Sans SC（Google Fonts）

## 设计系统

- 配色：Monochrome Professional + Blue Accent — `#18181B` / `#FAFAFA` / `#2563EB`
- 风格：Minimalism + Swiss Style，卡片正方形无圆角（`border-radius: 0`）
- 动画：页面切换向下渐隐渐显（opacity + translateY，300ms ease-out）

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run preview      # 预览生产构建
```

## 项目结构

```
src/
├── views/           # 4 个页面：HomePage, ProjectsPage, ExperiencePage, ContactPage
├── components/      # NavBar, ProjectCard, CategoryTabs, PageTransition
├── router/index.js  # Vue Router 配置，含页面过渡动画
├── data/            # 作品和能力数据（后续替换为真实内容）
└── assets/styles/   # CSS 变量和全局样式
```

## 关键设计决策

- 所有卡片正方形（`aspect-ratio: 1/1`）、无圆角、柔和阴影
- 导航栏固定顶部（`position: fixed; z-index: 100`），滚动不消失
- 项目页和经验能力页使用 CategoryTabs 标签筛选，无搜索/排序
- 联系页无标签栏，极简布局：居中标题 + 个人信息 + 背景视差
- 响应式断点：1024px（桌面）/ 768px（平板）/ 375px（移动端）
- 占位图使用纯色块，后续替换为真实作品

## 设计规范参考

详见 `docs/superpowers/specs/2026-05-08-portfolio-website-design.md`

## Development Environment
- OS: Windows 10.0.19045
- Shell: Git Bash
- Path format: Windows (use forward slashes in Git Bash)
- File system: Case-insensitive
- Line endings: CRLF (configure Git autocrlf)
