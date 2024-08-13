# Extranet-CSH Backend API

| Endpoint        | Description                             | Consumes                                                                     | Returns        |
|-----------------|-----------------------------------------|------------------------------------------------------------------------------|----------------|
| GET /           | Test endpoint                           |                                                                              | "Hello World!" |
| POST /send_mail | Send email via the SUPPORT_MAIL address | {<br/>to: string<br/>from: string<br/>subject: string<br/>text: string<br/>} |                | 