# How Netflix does DevOps

## Introduction
With around 300 million subscribers using the platform today, Netflix has grown significantly since its start in 1997. Their success can be attributed in part to their willingness to upgrade and transform their DevOps in response to failures/inefficiencies.

## Willingness to Change
### Cloud-based
One example of their willingness to adapt is their transition to cloud-based services. In 2008, a major database corruption resulted in an inability to ship DVDs for 3 days. In response, they moved everything to the cloud, choosing AWS. In the process, they converted their data center-based Java application into a cloud-based Java microservice architecture. This allowed them to add more redundancy and not have single points of failure while also allowing their engineers more independence with the various self-service tools.

### Container-based
Netflix initially had a cloud-native VM architecture, but they ultimately decided to move toward containers for a few reasons. Container images in the local environment are more similar to those in production, allowing for more accurate testing and easier development. Additionally, they are more lightweight and as a result can be created and deployed faster.

## Use of Teams
As a company with 1000s of engineers, their ability to coordinate is essential for it to keep up with its large customer base on a day-to-day basis, and Netflix shows a clear effort towards maximizing productivity among its developers.

### Operate What You Build Culture
While Netflix originally operated using isolated teams, with separate groups for developing, testing, deploying, etc, this organization had several issues. Not only did it take a long time due to the communication overhead that comes with updating each team about a product’s current state, but this communication inevitably left out information like a long game of telephone. In response to these issues, Netflix transitioned to teams where they are each responsible for their own systems and any development, testing, and overall maintenance they require. Developers' familiarity with the system they work on allows them to move through each step much faster.

### Team Topologies
Netflix has a complicated team structure in an attempt to maximize productivity. They have a centralized team of 150 people that are exclusively responsible for creating tools, platforms and infrastructure for developers in order to allow them to focus on their specific domains. In addition, they have teams like a cloud infrastructure team and data platform team, because developers “shouldn’t have to get down and dirty with understanding compute and networking and storage details” (Koehler directory of productivity engineering at Netflix). The general goal of all these teams is to better allow developers to stay in the zone.

## Heavy Testing Focus
The company’s ability to handle its vast customer base can also be attributed to its testing culture. In the WeAreNetflix podcast featuring two developers from the platform, they talked about how they realized a fear of testing caused it to happen infrequently and decided that it needed to be done more. Netflix created Chaos Engineers, specifically tasked with trying to make systems fail on purpose in order to test resilience. They have created a large number of tools used for testing. While initially these were opt-in, eventually most developers agreed that they should be doing it, so it is now an opt-out system.

### Examples of Chaos Tools
**Chaos Monkey:**
One of the earlier tools developed, this tool runs continuously and randomly goes into AWS clusters and will kill one node to make sure there is redundancy in the cluster. It serves primarily as a sanity check to ensure that redundancy was correctly added. 

**Latency Monkey:**
This tool can create false delays in the client-server layers in order to simulate a service going down, without it actually going down.

**Chaos Gorilla:**
This tool simulates an Amazon outage and therefore the outage of the many AWS services they use.

### AB Testing
In order to minimize the effect on the user experience when literally injecting failures, AB testing can be used to detect errors and quickly put a stop to it. In AB testing, one group of customers is given a ‘treatment’, in this case code with a failure intentionally placed in to test the system, while another group of customers is given unaffected code. With a baseline to test against, they can detect a large diverge and stop it in minutes.

### Benefits of Their Testing Style
Some may ask why Netflix does not just add extra redundancy in all their services instead of having a tool for deleting nodes or adding latency. The reality, as noted by a Netflix developer in their podcast, is that you cannot account for everything. He gave an example where they did a lot of testing only for it to fail in production because the error was due to a combination of languages that did not even exist when they began writing that code. Ultimately, seeing how the code responds to failures is the only way to know for certain that it works. This allows them to test many more combinations of conditions which allows them to find more bugs. Another point of their testing they noted is that because they have such an in-depth systems of checks in place, they are able to push to production much quicker, which allows Netflix as a whole to be faster.

## Conclusion
Netflix has experienced significant growth in the last decade, and much of it can be attributed to their attention to detail in their DevOps. Their willingness to move to better technologies, properly delegate responsibilities among various teams, and develop good testing infrastructure each assist in helping them push out more code faster while keeping uptime as high as possible.

## Sources
- [Developer Productivity Engineering at Netflix](https://thenewstack.io/developer-productivity-engineering-at-netflix/)
- [How Netflix Became A Master of DevOps? An Exclusive Case Study](https://www.simform.com/blog/netflix-devops-case-study/)
- [Netflix OSS](https://netflix.github.io/)
- [Sequential A/B Testing Keeps the World Streaming Netflix Part 2: Counting Processes](https://netflixtechblog.com/sequential-testing-keeps-the-world-streaming-netflix-part-2-counting-processes-da6805341642)
- [WeAreNetflix Podcast - Episode 9: Chaos Engineering](https://www.youtube.com/watch?v=kxEZmfUFGJs)
