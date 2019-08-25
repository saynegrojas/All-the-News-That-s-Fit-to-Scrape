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
    // console.log('test scrape from scrape');

    //call axios and pass in website as first parameter
    //second parameter is a function that take 3 parameter err, res, body
    axios.get(`${url}`).then(body => {

        //see if we get data back
        console.log(body);

        //set cheerio.load and pass in body to $ as the selector
        const $ = cheerio.load(body.data);

        //an empty array where all the data we scrape from the website
        const articles = [];
        //console.log(articles);
        
        //We scrape from parent to its children and get info and we want to get as text
        $('.PromoMedium-content').each( (i, element) => {
            //Headline element
            const head = $(element).children('.PromoMedium-titleContainer').children('.PromoMedium-title').text().trim();
            console.log(head);
            
            const newHead = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            console.log(newHead);
            

            //let link = $(element).children('.PromoMedium-titleContainer').children('.PromoMedium-title').children('.Link').attr('href');
            const sum = $('div.PromoMedium-description').text().trim();            
            console.log(sum);


            // if (head && sum) {
            //     let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            //     let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                //assigns headline, description to headNeat, desNeat
                articles.push({
                    headline: newHead, 
                    summary: sum
                });
                //Once we assign each one to its corresponding attributes
                //push dataToAdd in articles array
            //callback articles 
            console.log(articles);
            
            cb(articles);
        });

    });

}

//export scrape
module.exports = scrape;