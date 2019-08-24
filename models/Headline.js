//Headline mongoose schema associated with controller headline
//=======================================================

//Dependencies
const mongoose = require('mongoose');

//Instaniate Schema set to mongoose
const Schema = mongoose.Schema;

//headline schema 
const headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

//export Headline model and headline schema as second parameter
module.exports = mongoose.model('Headline', headlineSchema);