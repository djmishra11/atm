const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    cardNumber: Number,
    cardPin: Number
});


module.exports = mongoose.model('User', userSchema);