db.createUser(
    {
        user: "csh-backend",
        pwd: "very_secret_password",
        roles: [
            {
                role: "readWrite",
                db: "CSH"
            }
        ]
    }
);
