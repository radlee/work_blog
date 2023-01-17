const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const usersRoute = require('./routes/usersRoute');
const blogsRoute = require('./routes/blogsRoutes');

app.use(express.json());

app.use('/api/users', usersRoute);
app.use('/api/blogs', blogsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server busy on PORT: ${port}`);
})