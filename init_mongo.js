db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [
            {
                role: "readWrite",
                db: "CSH"
            }
        ]
    }
);
db.createCollection("Programme");
