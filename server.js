const express = require('express');
const path = require('path');
const resource = require('@neode/express');

//Load Neode with the variables stored in `.env` and tell neode
//to look for models in the ../../models directory

const neode = require('neode')
    .fromEnv()
    .withDirectory(path.join(__dirname, 'models'));

const app = express();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (reg, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
//app.use('api/users', resource(neode, 'User'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));