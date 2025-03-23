const express = require('express');
const db = require('../config/db');
const router = express.Router();
const authenticateToken = require('../middleware/auth')

router.get('/get_reminder', authenticateToken, (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: "User not found." });
    }

    db.query(
        "SELECT * FROM reminders WHERE user = ?",
        [user],
        (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(result);
        }
    );
});


router.post('/create_reminder', authenticateToken, (req, res) => {
    const user = req.user;
    const { time, text } = req.body;
    const isCompleted = false;

    db.query(
        "INSERT INTO reminders (user, time, text, isCompleted) VALUE (?,?,?,?)",
        [user, time, text, isCompleted],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).send("Reminder Inserted");
        }
    );
});


router.put('/update/:id', authenticateToken, (req, res) => {
    const id = req.params;
    const user = req.user;

    db.query(
        "UPDATE reminders SET isCompleted = NOT isCompleted WHERE id = ? AND user = ?",
        [id, user],
        (err, result) => {
            if (err) return res.status(500).json(err);
            
            db.query(
                "SELECT * FROM reminders WHERE user = ?",
                [user],
                (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(result);
                }
            );
        }
    );
});







// router.delete('/remove_reminder', (req, res) => {
//    const user = req.user.username; 
// });


module.exports = router;