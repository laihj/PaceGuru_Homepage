---
title: Data Input Design for Training Plans
date: 2025-07-22 10:00:00
tags: design, training
category: "Design"
---
In PaceGuru's training plans, runners need to input data that isn't purely numerical, including time, pace, and distance. I've designed dedicated input panels for these structured data types, which I call "limited natural input."

The time input design was completed first, inspired by a demo I saw on Twitter (I can't find the original post now, so thank you to whoever created it).

### The time input panel looks like this.
![time](/blog/en/images/input/timeInput.png)

Besides numbers, it can input hours, minutes, and seconds, and the program correctly recognizes all possible combinations.
For example, 2 hours and 30 minutes. You can input "2 hours 30 minutes", "2.5 hours", "150 minutes" - all will produce the same result. You can even input something you wouldn't normally say like "1 hour 90 minutes" and it will still be correctly recognized. This is much more convenient and intuitive than "02:30:00".

### Next is the pace input.
![pace](/blog/en/images/input/paceInput.png)

Pace is essentially just time, so the interface is similar to the time input. However, based on common usage, I removed the hour button and decimal point button since we don't typically express pace that way. Beyond normal text like "5 minutes 30 seconds", we also specifically support the 530 input format. 530 doesn't mean 530 seconds - it represents what runners commonly say as "530", meaning a pace of 5 minutes 30 seconds per kilometer.

### Finally, the distance input.
![distance](/blog/en/images/input/distanceInput.png)

In PaceGuru, we support both kilometers and miles. In most places, we display either kilometers or miles based on user settings. But in the distance input panel, we support inputting miles and automatically converting to kilometers. We imagined this scenario: you received a training plan that uses miles, but you normally use kilometers as your training distance unit. Here, you can directly input miles to get the correct result.