const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/atm',
 {
     useNewUrlParser: true,
     useUnifiedTopology: true
    }
 );