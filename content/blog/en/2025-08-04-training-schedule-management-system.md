---
title: 1.7.1 Upgraded Training Schedule Management System
date: 2025-08-04 10:00:00
tags: release, training, schedule
category: "Update"
---

Apple introduced a new training schedule setting feature in the WorkoutKit framework, allowing users to set custom training plans for specific dates. For example, you can set a speed workout for next Tuesday and a threshold workout for Friday during a weekend. When the scheduled time arrives, open the Fitness app on your Apple Watch, and you'll see the prompt to start the designated workout directly.

PaceGuru has supported this feature for a long time, but pure WorkoutKit has its drawbacks. For developers, it lacks various feedback mechanisms, making it feel unreliable.

For users (like me), its biggest drawback is that it only saves about 50 training sessions.

This leads to two problems: First, past training history cannot be saved. Second, it cannot support importing more than 50 training sessions at once, while training plans like [Hansons Marathon](https://paceguru.app/plans/hanson?lang=en) often exceed 50 sessions for an 18-week program. This means you have to store it elsewhere and edit it every week or two.

![list](/blog/en/images/schedule/list.jpeg)

So, in this version, I decided to save users' training schedule records locally, then sync them to Apple Watch at appropriate times. Each sync includes training plans for the next seven days, since your Apple Watch can only display plans for the past seven days and the next seven days at a time.

This way, we can support one-time import of Hansons Marathon plans, and you can follow the watch prompts for training all the way to race day.

![list](/blog/en/images/schedule/input.jpeg)

Additionally, we've upgraded the time selection control for training schedule arrangement. Compared to the old control, there are two main improvements.

First, many of us runners plan by week, so in this interface, if a week spans across months, you can select and schedule directly within the current month without needing to switch months. Each date displays existing training sessions with a dot or circle indicator, making it convenient to see the day's training status when scheduling.

Second, we support weekly recurring training. If you have fixed weekly training schedules, you can select them, and when training is completed or expires, PaceGuru will automatically generate new training for the same time next week.

Happy running!