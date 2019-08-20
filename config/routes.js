//Dependencies
const scrape = require('../scripts/scrape');
// const scrape = require('../scripts/scrape');
// const scrape = require('../scripts/scrape');

//export routes
module.exports = app => {
    //route renders homepage
    app.get('/', (req, res) => {
        res.render('home');
    });
    //route renders saved page
    app.get('/saved', (req, res) => {
        res.render('saved');
    });
};