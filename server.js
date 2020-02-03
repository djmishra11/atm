require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//middleware to use req.body...
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send({
        appName: "Dj"
    })
});

app.use('/api', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/atm'));
app.listen(3000, ()=> console.log("server started!"));
