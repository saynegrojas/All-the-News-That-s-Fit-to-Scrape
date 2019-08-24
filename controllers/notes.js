//notes where people can add notes associtate with the articles
//contain CRUD functionality
//=======================================================

//Bring in Note model and scripts date
const Note = require('../models/Note');
const createDate = require('../scripts/date');

//Export ojbects of functions
module.exports = {
    //Get all notes associated with articles
    get: (data, cb) => {
        Note.find({
            _headlineId: data._id
        }, cb);
    },
    //Save function takes in data from the user, and callback
    save: (data, cb) => {
        //Create an object newNote
        //Has headlineId associated with the note being created
        const newNote = {
            _headlineId: data._id,
            //Date when the note is created
            date: createDate(),
            //NoteText is associated with what the user inputs
            noteText: data.noteText
        }
        //Takes Notes and creates newNote, takes in err and found documentes
        Note.create(newNote, (err, found) => {
            if(err) throw err;
            console.log(found);
            cb(found);
        });
    },
    //Delete notes associated with the article
    delete: (data, cb) => {
        Note.remove({
            _id: data._id
        }, cb);
    }
};

