//Note mongoose schema associtated with controller notes
//=======================================================

//Dependencies
const mongoose = require('mongoose');

//An instance of Schema set to mongoose
const Schema = mongoose.Schema;

//Our note schema model referencing Headline
const noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});

//export Note model with headline schema as second parameter to 
module.exports = mongoose.model('Note', noteSchema);