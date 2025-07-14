---
title: 1.6.7 We Now Support Running Shoe Records
date: 2025-07-12 21:08:53
tags: release
category: "Update"
---
Many runners want to track their running shoes.

Some consider it from a practical perspective - after running 700-800 kilometers in a pair of shoes, their performance degrades and they should be replaced. Others are simply data enthusiasts who want to connect all possible data points.

I hadn't thought about this feature before. The main obstacle was thinking that implementing this would require maintaining a shoe database, which isn't realistic for an individual developer. Recently, I realized this might be overthinking it. Users don't necessarily need to select from a shoe database - they can create their own entries, and this functionality would be sufficient for most users' recording needs.

Here's a simple introduction to this feature:

![shoe](/blog/en/images/shoelist.png)

We've added an entry point on the homepage - click "Manage Your Shoe Collection". In this interface, you can add and edit running shoe information. If you set a shoe as default here, every time you sync new running records, they will automatically be linked to this pair of shoes.

![detail](/blog/en/images/detail.png)

In your running records, you can see which shoes were used for each run and can choose to replace them.