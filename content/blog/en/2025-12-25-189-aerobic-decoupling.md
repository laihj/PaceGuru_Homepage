---
title: "PaceGuru 1.8.9: Aerobic Decoupling & Fitness Score"
date: 2025-12-25 10:00:00
tags: [PaceGuru,Algorithm]
---

Have you ever noticed during a run: your pace stays the same, but your heart rate keeps climbing higher? Or in the second half of a race, even though your heart rate remains high, your body seems to "lose control" and slow down?

In PaceGuru's latest update, we've introduced core metrics for measuring endurance fitness — Aerobic Decoupling and Fitness Score.

## What is "Aerobic Decoupling"?

In an ideal steady state, heart rate (input) and pace (output) should run in parallel. However, as exercise duration increases, due to rising body temperature, fluid loss, and neuromuscular fatigue, your heart must beat faster to maintain the same output.

This phenomenon of "drifting apart" is aerobic decoupling. Generally speaking, the lower the degree of aerobic decoupling, the better your aerobic base.

## How Does PaceGuru Calculate This?

We select running records over one hour with relatively stable pace throughout, using a sophisticated algorithm to reveal your true fitness state. Since we're calculating heart rate drift, the smaller the pace variation, the better — if pace changes too much, the reference value of this data decreases, so we mark it as "for entertainment only."

![](/blog/en/images/189/aero_entry.png)

In PaceGuru, we've provided two entry points for this feature: one is the Aerobic Fitness Analysis tool in running tools where you can select qualifying running data, and another is on the training detail page where qualifying records will show an Aerobic Fitness Analysis button.

After selecting a running record, we compare heart rate from the first half with the second half to get the heart rate drift result. Generally, if this heart rate drift is below 5%, it means your base at this pace is very solid. You can consider increasing your pace slightly — a safe threshold is about 5-10 seconds faster.

If drift exceeds 10%, first check if your pace was stable. Perhaps this was an interval workout. If it was a steady-pace training session, it means you cannot yet handle this pace effectively. As a training recommendation, we suggest you lower your pace slightly for Zone 2 training.

Beyond heart rate drift, you'll also see a value called Training Score. Simply put, this measures your running ability. When your heart rate is stable, the higher your pace at the same heart rate, the higher this score will be. We've set 5-7 points as the score range for intermediate runners. You can compare scores from multiple LSD runs to track your progress trend.

To make the data clear at a glance, PaceGuru combines your aerobic ability and endurance stability into a 10-point Fitness Score:

- **Score > 8.5 (Elite)**: Your engine has both large displacement (fast) and excellent cooling (stable).
- **Score 5.0 - 7.0 (Intermediate)**: You already have a solid foundation. Consider trying higher pace stimuli.
- **Score < 3.0 (Beginner)**: Your body is still adapting. Don't worry — more Zone 2 training is your key to progression.

Below are actual scores from two of my 100-minute runs from different weeks. You can see how different stability and pace affect the running ability score.

![](/blog/en/images/189/areo_lsd.png)

## What Does This Mean For You?

With PaceGuru's feature, you no longer need to train blindly:

- If you find aerobic decoupling < 3%: Congratulations! Your current pace range is too "easy" — boldly challenge faster paces.
- If you find efficiency significantly declining: This reminds you to strengthen long-distance training or pay more attention to hydration and cooling.

PaceGuru doesn't just record your sweat — it understands your heart.
