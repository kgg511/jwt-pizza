| Self-Attack #1: | Katherine Greer                                                                                                |
|-----------------|----------------------------------------------------------------------------------------------------------------|
| Date            | 4/7/2025                                                                                                       |
| Target          | pizza.tastetrove.click                                                                                         |
| Classification  | Insecure Design                                                                                                |
| Severity        | Medium                                                                                                         |
| Description     | Hacker was able to purchase pizzas for free or even negative amounts, causing the store to lose lots of money. |
| Images          | ![A1](selfA1.png) ![A12](selfA12.png)                                                                          |
| Corrections     | Validate more than just the menu id. Verify that important information like price has not been modified.       |







| Self-Attack #2:  | Katherine Greer                                                                                                                                                                                                                                   |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Date             | 4/7/2025                                                                                                                                                                                                                                          |
| Target           | pizza.tastetrove.click                                                                                                                                                                                                                            |
| Classification   | Injection                                                                                                                                                                                                                                         |
| Severity         | High                                                                                                                                                                                                                                              |
| Description      | All existing accounts but the first (the admin account) are inaccessible due to them all having the same username and password. Hacker has changed the email and password of this account. Hacker has deleted all stores using these permissions. |
| Images           | ![A2](selfA2.png) ![A22](selfA22.png)                                                                                                                                                                           |
| Corrections      | Sanitize all user inputs with the database, including when the user alters their username/password.                                                                                                                                               |



| Peer-Attack #1:  | Hacker: Katherine Greer Victim: KanJim Kim                                                                                                         |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Date             | 4/10/2025                                                                                                                                          |
| Target           | pizza.byulage.click                                                                                                                                |
| Classification   | Security Misconfiguration                                                                                                                          |
| Severity         | High                                                                                                                                               |
| Description      | The admin account credentials were available on a public repository, allowing the hacker to get admin permissions and delete all franchise stores. |
| Images           | ![A1](p2p1.png) ![A12](p2p12.png)                                                                                |
| Corrections      | Use secrets to avoid having admin credentials visible.                                                                                             |



| Peer-Attack #2:  | Hacker: Katherine Greer Victim: KanJim Kim                                                                                                                   |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Date             | 4/10/2025                                                                                                                                                    |
| Target           | pizza.byulage.click                                                                                                                                          |
| Classification   | Injection                                                                                                                                                    |
| Severity         | High (except not because it didn’t work)                                                                                                                     |
| Description      | Hacker attempted to use SQL injection on the update user endpoint but was not successful because the update user endpoint is broken and doesn’t work anyway. |
| Images           | ![A1](p2p2.png)                                                                                                                                                            |
| Corrections      | Fix database so that users can update their username and password. Then make sure that all user inputs are sanitized.                                        |

