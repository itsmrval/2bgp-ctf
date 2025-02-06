require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

const app = express();
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/auth', require('./src/routes/auth'));
app.use('/users', require('./src/routes/users'));
app.use('/levels', require('./src/routes/levels'));
app.use('/points', require('./src/routes/points'));
app.use('/teams', require('./src/routes/teams'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
