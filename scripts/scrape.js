//info cheerio needs to scrape from the news webpage
const axios = require('axios');
const cheerio = require('cheerio');

//PromoLarge-title need text inside href 
//Link need link 
//PromoLarge-description

const scrape = (cb) => {
    axios('https://www.sandiegouniontribune.com/', (err, res, body) => {
        const $ = cheerio.load(body);

        let articles = [];

        $('.PromoSmall-wrapper').each((i, el) => {
            let head = $(this).children('.PromoSmall-titleContainerDupe"').children('.PromoSmall-title').text().trim();
            let des = $(this).children('.PromoSmall-content').children('.PromoSmall-description').text().trim();

            if(head && des){
                let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                let desNeat = des.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                let dataToAdd = {
                    headlines: headNeat,
                    description: desNeat
                }

                articles.push(dataToAdd);
            }
            cb(articles);
        })
    })
}

module.exports = scrape;