//Bring in script/scrape
const scrape = require('../scripts/scrape');

//Bring headlines and notes from controller
const headlines = require('../controllers/headlines');
const notes = require('../controllers/notes');

//Export routes
module.exports = function(app) {
    //Route renders homepage
    app.get('/', (req, res) => {
        res.render('home');
    });
    //Route renders saved page
    app.get('/saved', (req, res) => {
        res.render('saved');
    });

    //Use fetch function from headline controllers and create api route to fetch all articles
    app.get('/api/fetch', (req, res) => {
        //console.log('hello');
        
        //Go to headlines controller and run fetch pass in a function that take two parameters
        headlines.fetch((err,found) => {
            if(err) throw err;
            //WILL GIVE ERROR UNLESS FETCH IS SUCCESSFUL IN CONTROLLERS headlines
            console.log(found);
            
            //if none found or inserted = 0, give message
            if(!found || found.insertedCount === 0) {
                res.json({
                    msg: "No new article today. Check back tomorrow."
                });
            } else {
                //if there are articles found or some inserted run message + the count
                res.json({
                    msg: `Added ${found.insertedCount} new articles`
                });
            }
        });
    });

    //Get all headlines in database route
    app.get('/api/headlines', (req, res) => {
        //Request as an empty object called query
        let query = {};
        //If request was specified, set query to req.query
        if(req.query.saved) {
            query = req.query;
        }
        //If request is not specified, return everything
        headlines.get(query, data => {
            res.json(data);
        });
    });

    //Delete specific article route
    app.delete('/api/headlines/:id', (req, res) => {
        //Empty object to start query
        let query = {};
        //set query._id to what the req params id is selected
        query._id = req.params.id;
        headlines.delete(query, (err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });

    //Update headlines route
    app.patch('/api/headlines', (req, res) => {
        headlines.update(req.body, (err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });

    //Grab all notes associated with headline id to display
    app.get('/api/notes/:headline_id?', (req, res) => {
      let query = {};
      //If the parameter the user set exists is true
      if(req.params.headline_id) {
          //set query._id to req params headline id
          query._id = req.params.headline_id;
      }
      //Use Get function to notes controller and pass in the query selected
      //Return data associted with that
      notes.get(query, (err, data) => {
          if(err) throw err;
          res.json(data);
        });  
    });

    //Route to delete notes
    app.delete('/api/notes/:id', (req, res) => {
        notes.delete(query, (err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });

    //Route to post new notes to articles
    app.post('/api/notes', (req, res) => {
        //user send as req.body
        notes.save(req.body, (data) => {
            res.json(data);
        });
    });
}