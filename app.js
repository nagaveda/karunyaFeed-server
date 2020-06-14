const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const {MONGOURI} = require('./keys');

require('./models/user')
app.use(express.json());
app.use(require('./routes/auth'));


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Succesfully connected to Database!');
})

mongoose.connection.on('error', (err) => {
    console.log('ERROR connecting: '+err);
})

app.listen(PORT, () => {
    console.log('Server running on port: ',PORT);
});