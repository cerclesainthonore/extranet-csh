# Extranet-CSH Backend API

| Endpoint                   | Description                             | Consumes                                                                                     | Returns        |
|----------------------------|-----------------------------------------|----------------------------------------------------------------------------------------------|----------------|
| GET /                      | Test endpoint                           |                                                                                              | "Hello World!" |
| POST /send_mail            | Send email via the SUPPORT_MAIL address | {<br/>to: string<br/>from: string<br/>subject: string<br/>text: string<br/>name: string<br/>} |                |
| POST /newsletter/subscribe | Add an user to the newsletter registry  | {<br/>name: string<br/>mail: string<br/>phone?: string<br/>discoveredVia: string<br/>}       |                |