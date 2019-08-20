//Notes mongoose schema associtated with controller notes
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headlines"
  
    },
    date: String,
    noteText: String
});

module.exports = mongoose.model('Notes', headlineSchema);