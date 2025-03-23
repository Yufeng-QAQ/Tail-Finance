const express = require('express');
const db = require('../config/db');
const router = express.Router();


router.post('/create_transaction', (req, res) => {
    const { type, amount, date, note, category, user } = req.body;
    db.query(
        "INSERT INTO transactions (type, amount, date, note, category, user) VALUES (?, ?, ?, ?, ?, ?)",
        [type, amount, date, note, category, user],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).send("Transaction Inserted");
        }
    );
});

router.get('/get_transaction', (req, res) => {
    const user = req.user.username;
    db.query(
        "SELECT * FROM transactions WHERE user = ?",
        [user],
        (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(result)
        }
    );
})

module.exports = router;