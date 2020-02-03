const mongoose = require('mongoose');

const cashSchema = mongoose.Schema({
    twoThousand: {
        type: Number,
        default: 0
    },
    fiveHundred: {
        type: Number,
        default: 0
    },
    atmLocation: {
        type: String,
        default: 'Silchar'
    },
    total: {
        type: Number,
        default: 0
    },

});


module.exports = mongoose.model('Cash', cashSchema);