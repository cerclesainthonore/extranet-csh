# Extranet-CSH Backend API

| Endpoint                   | Description                              | Consumes | Returns |
|----------------------------|------------------------------------------|----------|---------|
| GET /                      | Test endpoint                            |          | text    |
| POST /send_mail            | Send email via the SUPPORT_MAIL address  | JSON     |         |
| POST /newsletter/subscribe | Add an user to the newsletter registry   | JSON     |         |
| GET /conferences/tags      | Fetch conference categories              |          | JSON    |
| GET /conferences           | Fetch all conferences                    |          | JSON    |
| GET /conferences/:id       | Fetch specific data for one conference   |          | JSON    |