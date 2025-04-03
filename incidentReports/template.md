# Incident: 2025-04-02 4-50-00

## Summary
All times are UTC.
> [!NOTE]
> Write a summary of the incident in a few sentences. Include what happened, why, the severity of the incident and how long the impact lasted.

```md
Between the hour of 4:50-5:20AM on 4/2/2025, 10s of users encountered an inability to purchase a pizza. The event was triggered by an error with the pizza factory sometime between 4:50-5:20AM.

The pizza factory appears to have gone down due to a deleted database. The jwt-pizza team started working on the event by manually sending their own requests to order pizza, finding the reportPizzaCreationErrorToPizzaFactoryUrl, and reporting the error to the factory. This major impact incident affected 80% of users, anyone trying to order a pizza.
```

## Detection

> [!NOTE]
> When did the team detect the incident? How did they know it was happening? How could we improve time-to-detection? Consider: How would we have cut that time by half?

```md
This incident was detected at 5:23AM UTC when pizza revenue suddenly dropped to 0 and pizza creation failures rapidly increased. Katie Greer was already observing the metrics and observed the issue without any alerts.

To decrease response time in the future, alerts will be set up specifically for pizza creation failures. Alerts set up for all request errors were unable to detect a significant change in errors during this incident, indicating a clear deficiency in error detection with the factory. Additionally, alerts will be set up for metrics like revenue being 0, instead of just having alerts for high values.
```

## Impact

> [!NOTE]
> Describe how the incident impacted internal and external users during the incident. Include how many support cases were raised.

```md
For 44 minutes between 4:50am and 5:34am UTC on 04/02/25, the pizza factory went down, preventing users from ordering pizas. This incident is estimated to have affected 100 internal users, affecting 100% of users ordering pizzas. No external users are thought to have been affected.

30 support tickets and 329 social media posts were submitted.
```

## Timeline

> [!NOTE]
> Detail the incident timeline. We recommend using UTC to standardize for timezones.
> Include any notable lead-up events, any starts of activity, the first known impact, and escalations. Note any decisions or changed made, and when the incident ended, along with any post-impact events of note.

```md

All times are UTC.

- 2:00AM: Traffic is simulated to pizza-service.tastetrove.click and looks normal.
- 3:50AM: Traffic is suspended for 5 minutes.
- 3:55AM: Traffic is simulated and still looks normal.
- 4:50AM: Traffic is suspended.
- 5:20AM: Traffic is simulated again.
- 5:23AM: Unusually low revenue and a high error rate from pizza creation is detected through human observation.
- 5:24AM: Katie starts a further investigation of metrics.
- 5:32AM: Katie manually sends a request to order a pizza, gets the report URL, and submits it to the factory.
- 5:34AM: Katie confirms that the factory is once again stable and functioning properly.
```

## Response

> [!NOTE]
> Who responded to the incident? When did they respond, and what did they do? Note any delays or obstacles to responding.

```md
After coming in at 5:20AM UTC, Katie observed the incident while already working. She was not present during the event that triggered the incident due to a meeting and so only noticed it after she started simulating traffic to the site afterwards.
```

## Root cause

> [!NOTE]
> Note the final root cause of the incident, the thing identified that needs to change in order to prevent this class of incident from happening again.

```md
An employee at the pizza factory accidentally deleted their entire database without them realizing, causing their service to go down. To prevent this incident from occurring again, we must get the pizza factory to add more redundancy into their systems or find alternative methods of creating pizzas.
```

## Resolution

> [!NOTE]
> Describe how the service was restored and the incident was deemed over. Detail how the service was successfully restored and you knew how what steps you needed to take to recovery.
> Depending on the scenario, consider these questions: How could you improve time to mitigation? How could you have cut that time by half?

```md
Katie observed that most metrics looked normal, except for pizza revenue and pizza creation, confirming that the error was likely with the pizza factory. To further investigate, she sent requests, and seeing the URL coming back with an easy to understand name, realized that she must run said URL to alert the factory. The factory, receiving the alert, deployed a redundant database, fixing their service, and fired the staff that took a 40 minute bathroom break and accordingly did not notice a deleted database during that time.

Jwt-pizza likely would have detected the error sooner with more metrics and constant traffic being simulated to the site.
```

## Prevention

> [!NOTE]
> Now that you know the root cause, can you look back and see any other incidents that could have the same root cause? If yes, note what mitigation was attempted in those incidents and ask why this incident occurred again.

```md
This is the first time that the factory has gone down while jwt-pizza has been in service, so we have no previous incidents with this root cause.
```

## Action items
> [!NOTE]
> Describe the corrective action ordered to prevent this class of incident in the future. Note who is responsible and when they have to complete the work and where that work is being tracked.

```md
** all actions are the responsibility of Katie, the only person on shift right now **
1. Within the week, discuss with the pizza-factory the importance of having alerts for critical systems going down instead of relying on solely external reporting.
2. In the next few days, add additional alerts to catch solely pizza factory errors.
3. In the next few weeks, look for alternative pizza factories or create a temporary on-site backup in case of future incidents.
```
