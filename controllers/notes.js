//notes where people can add notes associtate with the articles
//contain CRUD functionality

//Dependencies
const Notes = require('../models/Notes');
const createDate = require('../scripts/date');

module.exports = {
    //get all notes associated with articles
    get: (data, cb) => {
        Notes.find({_headlineId: data._id}, cb);
    },
    //save function takes in data from the user, and callback
    save: (data, cb) => {
        //create an object newNote
        //has headlineId associated with the note being created
        const newNote = {
            _headlineId: data._id,
            //date when the note is created
            date: createDate(),
            //noteText is associated with what the user inputs
            noteText: data.noteText
        };
        //takes Notes and creates newNote, takes in err and found documentes
        Notes.create(newNote, (err, found) => {
            if(err) throw err;
            log(found);
            cb(found);
        });
    },
    //delete notes associated with the article
    delete: (data, cb) => {
        Notes.remove({_id: data._id}, cb);
    }
};

