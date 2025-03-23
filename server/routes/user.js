const bcrypt = require('bcryptjs')
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const saltRounds = 10;

router.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Encrypt password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.status(500).json(err);

        // Insert to database
        db.query(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, hash],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({ error: "Username already exists" });
                    }
                    return res.status(500).json({ error: "Error inserting user into database", details: err });
                }

                res.status(201).send("New User Account Created");
            }
        );
    });
});


router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, result) => {

            // Handel potential errors
            if (err) return res.status(500).json(err);
            if (result.length === 0) {
                return res.status(401).json("Username or Password Incorrect");
            }

            const user = result[0];

            // Verify password
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) return res.status(500).json(err);
                if (!match) return res.status(401).json('Username or Password Incorrect');

                // Create JWT
                const accessToken = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET);
                res.json({ auth: true, user: username, accessToken });
            })

        }
    )
})


module.exports = router;