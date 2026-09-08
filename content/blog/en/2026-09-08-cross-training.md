---
title: "Swimming, Cycling, and Strength Now Count: Bringing Cross-Training into PaceGuru"
date: 2026-09-08 09:00:00
excerpt: "A runner's training isn't only running. This update brings swimming, cycling, and strength training into PaceGuru's fatigue system — they raise your fatigue, but they never leak into your running stats. That line was deliberate."
category: "Product updates"
topic: "cross-training"
tags:
  - "cross-training"
  - "fatigue"
  - "swimming"
  - "cycling"
  - "strength training"
  - "PaceGuru"
---

## The question we kept getting

"I also swim and ride every week — does that count as training?"

Until now, the answer was no. PaceGuru only understood running — fatigue was computed from running load alone, and everything else might as well never have happened. For a runner who rides twice a week, that was clearly wrong: cross-training also taxes you, and also demands recovery.

This update fixes it: **swimming, cycling, and strength training now sync automatically from the Health app into PaceGuru, and they count toward fatigue.**

## The key decision: in fatigue, not in mileage

Before building it, we settled on a boundary:

> Cross-training affects **fatigue and recovery**, but it **leaves running statistics untouched**.

The reasoning is simple. Fatigue is a body-level fact — a thousand meters of swimming or five sets of squats carry a real cost, and the recovery demand is real. But mileage goals, pace stats, VDOT, and personal bests in PaceGuru measure **running ability**. Riding forty kilometers is impressive, but it shouldn't show up in your weekly mileage, let alone count as "a run nearly marathon distance."

So here's what you'll see:

- Weekly/monthly/yearly mileage on the home screen, the 30-day summary, calendar stats, VDOT — **running only**
- Fatigue and recovery forecasts — **every sport counts**

## Different sports, different fatigue math

The body doesn't pay the same price for every sport, so each type gets its own weight:

| Sport | Fatigue calculation |
|---|---|
| Running | HR-weighted load ×1.0 (baseline) |
| Cycling | HR-weighted load ×0.9 — heart rate reflects intensity honestly, but there's no eccentric impact, so recovery costs less |
| Swimming | HR-weighted load ×0.85 — heart rate runs naturally lower in water, but there's no impact either; the two roughly offset into a mild discount |
| Strength | minutes × perceived intensity (RPE) ÷ 10 |

Strength deserves its own note. **The heart-rate formula barely works for lifting**: rest between sets pulls your heart rate back near resting, so the computed load approaches zero — yet anyone who has done leg day knows how the next morning feels. So strength follows the sRPE approach that's more standard in sport science: training minutes multiplied by perceived exertion.

After a session, a picker asks how hard you went, defaulting to 6 (moderately hard). Skipping it is fine — the default keeps working — but the more honest your rating, the closer fatigue tracks how you actually feel.

## Where you'll see them

Cross-training entries appear on **the same timeline** as your runs, in a lighter format: a type icon, duration, heart rate, calories — one line, that's it. They don't get detail pages; we didn't want to force pages onto three sports with tiny data footprints.

![Cross-training rows in the workout list](/blog/zh/images/cross-training/list-row.jpg)

The more interesting spot is the **fatigue trend curve**: each cross-training node is marked with its little icon (swim, bike, dumbbell). When a strength session lifts the curve, you'll see it at a glance — you can finally answer "why am I so tired today."

![Cross-training markers on the fatigue curve](/blog/zh/images/cross-training/fatigue-marker.jpg)

## One last thing

This integration doesn't request any new health permissions. Duration, heart rate, and calories come from the workout records themselves, and the fatigue math uses only data already inside the granted scope.

Cross-training isn't a side dish to running — it's part of the complete training picture. Now your fatigue knows that too.
