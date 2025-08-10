#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function createBlogPost(title) {
  if (!title) {
    console.error('请提供博客标题，例如: node new-blog.js "我的新博客"');
    process.exit(1);
  }

  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const fileName = `${dateStr}-${title.replace(/\s+/g, '-').toLowerCase()}.md`;
  const filePath = path.join(__dirname, 'content', 'blog', 'zh', fileName);

  const template = `---
title: "${title}"
date: "${dateStr}"
author: "paceguru"
tags: ["跑步", "训练"]
description: "${title}"
---

## ${title}

在这里开始写作...

![图片](/blog/zh/images/placeholder.jpg)

### 总结

- 要点1
- 要点2
- 要点3
`;

  if (fs.existsSync(filePath)) {
    console.error(`文件已存在: ${filePath}`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`✅ 已创建博客文章: ${filePath}`);
  console.log(`📁 文件路径: ${filePath}`);
}

const title = process.argv[2];
createBlogPost(title);