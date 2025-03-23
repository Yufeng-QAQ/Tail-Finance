require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const jwt = require('jsonwebtoken');
// const authenticateToken = require('./middleware/auth');

app.use(cors());
app.use(express.json());
// app.use(authenticateToken);

const users = [
    {
        username: "Tail",
        title: "admin",
        userID: 10000
    },
    {
        username: "BoBo",
        title: "user",
        userID: 10001
    }
]

// app.get('/users', authenticateToken, (req, res) => {
//     res.json(users.filter(user => user.username === req.user.name));
// });

// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const user = { name: username };

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({ accessToken: accessToken })
// })

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token === null) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }






// const transactionRoutes = require('./routes/transaction');
// const reminderRoutes = require('./routes/reminder');
// const userRoutes = require('./routes/user');

app.use('/transactions', require('./routes/transaction'));
app.use('/reminders', require('./routes/reminder'));
app.use('/users', require('./routes/user'));

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})