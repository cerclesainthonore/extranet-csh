db.createUser(
    {
        user: "csh-backend",
        pwd: "UNSECURE__CHANGE_THIS_PASSWORD",
        roles: [
            {
                role: "readWrite",
                db: "CSH"
            }
        ]
    }
);
db.createCollection("Newsletter");