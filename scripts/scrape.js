//Scrape headline, summary from our website 
//=======================================================

//Dependencies
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.sandiegouniontribune.com/';
console.log(url);

//Scrape function that get all the info we want from a website
//set to a function with a callback paramater
const scrape = cb => {
    console.log('test scrape');

    //call axios and pass in website as first parameter
    //second parameter is a function that take 3 parameter err, res, body
    axios.get(`${url}`).then(res => {

        //see if we get data back
        //console.log(res);

        //set cheerio.load and pass in body to $ as the selector
        const $ = cheerio.load(res);

        //an empty array where all the data we scrape from the website
        let articles = [];

        //We scrape from parent to its children and get info and we want to get as text
        //$('.PromoMedium-content').each((i, el) => {
        let head = $('.PromoMedium-content').children('.PromoMedium-titleContainer').text().trim()
        console.log(head);

        if (head && sum) {
            let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            //assigns headline, description to headNeat, desNeat
            let dataToAdd = {
                headline: headNeat,
                summary: sumNeat
            }
            //Once we assign each one to its corresponding attributes
            //push dataToAdd in articles array
            articles.push(dataToAdd);
        }
        //callback articles 
        cb(articles);
        // });
    });
}

//export scrape
module.exports = scrape;