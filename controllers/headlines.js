//Headline news articles 
//contain CRUD functionality(create read update delete)
//=======================================================

//Dependencies
//Bring scrape and createDate scripts
const scrape = require('../scripts/scrape');
const createDate = require('../scripts/date');

//Bring Headline mongoose models
const Headline = require('../models/Headline');

//functionality delete, save..
module.exports = {
    //Fetch will run the scrape function to grab all articles
    //Insert in Headline collections

    //Run fetch, function with a callback parameter
    fetch: (cb) => {
        // console.log('fetch from headlines');
        
        //Run scrape pass in a function with data as a parameter
        scrape( (data) => {
            console.log('hello');
            
            //Set data to an instance of articles
            let articles = data;

            //Loop through the length of articles
            for (let i = 0; i < articles.length; i++){
                //Run createDate function to insert date in articles
                articles[i].date = createDate();
                //Set saved to false in all articles we scrape
                articles[i].saved = false;
            }
            //Insert into Headline articles
            //Run mongodb and insert many articles
            //Second parameter is declaring articles does not go in need to go in order
            //Third parameter is a function with an err, found passed in
            Headline.collection.insertMany(articles, {ordered: false}, (err, found) => {
                //If one article gives error, will skip and continue
                cb(err, found);
            });
        });
    },
    //Delete 
    delete: (query, cb) => {
        Headline.remove(query, cb);
    },
    //Get all Headline in the query out, sort decending order
    get: (query, cb) => {
        Headline.find(query).sort({_id: -1}).exec( (err, found) => {
            cb(found);
        }); 
    },
    //Update articles
    update: (query, cb) => {
        Headline.update({_id: query._id}, {$set: query}, {}, cb);
    }
}