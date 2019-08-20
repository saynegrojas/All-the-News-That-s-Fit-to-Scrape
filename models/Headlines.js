//Headline mongoose schema associated with controller headlines
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Headlines', headlineSchema);