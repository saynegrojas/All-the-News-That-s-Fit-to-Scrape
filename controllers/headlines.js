//Headlines news articles 
//contain CRUD functionality(create read update delete)

//Dependencies
//bring scrape and createDate scripts
const scrape = require('../scripts/scrape');
const createDate = require('../scripts/date');

//bring Headlines and Notes mongoose models
const Headlines = require('../models/Headlines');

//functionality delete, save..
module.exports = {
    //fetch will run the scrape function to grab all articles
    //insert in Headlines collections

    //run fetch, function with a callback parameter
    fetch: (cb) => {
        //run scrape
        scrape( (data) => {
            //set data to an instance of articles
            let articles = data;
            //loop through the length of articles
            for (let i = 0; i < articles.length; i++){
                //run createDate function to insert date
                articles[i].date = createDate();
                //set saved to false in all 
                articles[i].saved = false;
            }
            //insert into Headlines articles
            //run mongodb and insert many articles, not in order
            Headlines.collection.insertMany(articles, {ordered: false}, (err, found) =>{
                //if one article gives error, will skip and continue
                cb(err, found);
            });
        });
    },
    //delete
    delete: (query, cb) => {
        Headlines.remove(query, cb);
    },
    //get all Headlines in the query out, sort decending order
    get: (query, cb) => {
        Headlines.find(query).sort({_id: -1}).exec( (err, found) => {
            cb(found);
        }) 
    },
    //update articles
    update: (query, cb) => {
        Headlines.update({_id: query._id}, {$set: query}, {}, cb);
    }
}