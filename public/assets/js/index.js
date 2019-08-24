$(document).ready( () => {
    //Set a reference to the article-container div where all dynamic content will go
    //Add event listeners to any generated save articles
    //Scrape new articles buttons

    const articleContainer = $('.article-container');

    const initPage = () => {
        //Empty article contianer
        articleContainer.empty();
        //run ajax request for unsaved headlines
        $.get('/api/headlines?saved=false')
        .then(data => {
            //If there are headlines, render to page
            if(data && data.length) {
                renderArticles(data);
            } else {
                //If none, render a no articles message
                renderEmpty();
            }
        });
    }

    //Initiate Page
    initPage();

    //Function handles appending HTML containing articles data to the page
    const renderArticles = (articles) => {
        console.log(articles);
        //set articles to an empty array where we are passed json containing all articles in our db
        let articlePanels = [];

        //pass in each article object to create panel function, returns article panel with data inside
        for(let i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
    }
    
    //Function takes in a parameter which is a single object for article/headline
    const createPanel = (articles) => {
        //Creates a jquery element containing all of the formatted HTML for article panel
        let panel = $([
            "div class='panel panel-default'>",
            "div class='btn btn-success save'>",
            "<h3>",
            article.headline,
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "<h3>",
            "</div>",
            "<div class='panel-body'>",
            article.summary,
            "</div>", 
            "</div>"
        ].join(''));
        //Attach the article's id to jquery element
        //Use this to figure out which article the user saves
        panel.data('_id', article._id);
        //Return created panel jquery element
        return panel;
    }

    //Function renders some html to page for no articles to view
    const renderEmpty = () => {
        let emptyAlert = $([
            "<div class='alert alert-warning text-center'>",
            "<h4> Looks like there are no articles to view. </h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>What would you like to do?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'> Try scraping new articles</a></h4>",
            "</div>",
            "</div>"
        ].join(""));
        //Append data to page
        articleContainer.append(emptyAlert);
    }

    //Function triggered when user wants to save an article
    const handleArticleSave = () => {
        //Initial article render js object is attached containing headline id
        //Retrieve the element using .data method
        let articleToSave = $(this).parents('.panel').data();
        articleToSave = true;

        //AJAX with patch method for updating to existing data in collections
        $.ajax({
            method: 'PATCH',
            url: '/api/headlines',
            data: articleToSave
        }).then(data => {
            if (data.ok) {
                initPage();
            }
        });
    }

    $(document).on('click', '.btn.save', handleArticleSave);
    $(document).on('click', '.scrape-new', handleArticleSave);

    //Function handles clicking any scrape new articles  buttons
    const handleArticleScrape = () => {
        $.get('/api/fetch').then(data => {
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.msg + "<h3>" );
        });
    }
});