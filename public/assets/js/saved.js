$(document).ready( () =>{
    const articleContainer = $('.article-container');

    //Initial page function
    const initPage = () => {
        //Empty article contianer
        articleContainer.empty();
        //run ajax request for unsaved headlines
        $.get('/api/headlines?saved=true').then(data => {
            //If there are headlines, render to page
            if (data && data.length) {
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
            articles.headline,
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "<h3>",
            "</div>",
            "<div class='panel-body'>",
            articles.summary,
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

    const renderNotesList = data => {
        let notesToRender = [];
        let currentNote;

        if(!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "No notes for this article yet.",
                "</li>"
            ].join('');
            notesToRender.push(currentNote);
        } else {
            for(let i = 0; i < data.notes.length; i++) {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-danger note-delete'>x</button>",
                    "</li>"
                ].join(''));
                currentNote.children('button').data('_id', data.notes[i]._id);
                notesToRender.push(currentNote);
            }
        }

        $('.note-container').append(notesToRender);
    }

    //===================== Events Handlers ============================

    const handleArticleDelete = () => {
        let articleToDelete = $(this).parents('.panel').data();
        $.ajax({
            method: 'DELETE',
            url: '/api/headlines/' + articleToDelete._id,
        }).then(data => {
            if(data.ok) {
                initPage();
            }
        });
    }

    const handleArticleNotes = () => {
        const currentArticle = $(this).parents('.panel').data();
        $.get('/api/notes/' + currentArticle._id).then(data => {
            let modalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Notes For Article: ", 
                currentArticle._id,
                "</h4>",
                "<hr />",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
                "<button class='btn btn-success save'> Save Note </button>",
                "</div>"
            ].join("");
            bootbox.dialog({
                msg: modalText,
                closeButton: true
            });
            let noteData = {
                _id: currentArticle._id,
                notes: data || []
            };

            $('.btn.save').data('article', noteData);
            renderNotesList(noteData);
        });
    }

    const handleNoteSave = () => {
        let noteData;
        let newNote = $('.bootbox-body text-area').val().trim();

        if(newNote) {
            noteData = {
                _id: $(this).data('article')._id,
                noteText: newNote
            };
            $.post('/api/notes', noteData).then( () => {
                bootbox.hideAll();
            });
        }
    }

    const handleNoteeDelete = () => {
        let noteToDelete = $(this).data('_id');

        $.ajax({
            method: 'DELETE',
            url: '/api/notes/' + noteToDelete
        }).then( () => {
            bootbox.hideAll();
        });
    }
    
    //Click events that will handle each button according to their names
    $(document).on('click', '.btn.delete', handleArticleDelete);
    $(document).on('click', '.btn.notes', handleArticleNotes);
    $(document).on('click', '.btn.save', handleNoteSave);
    $(document).on('click', '.btn.note-delete', handleNoteeDelete);
}); 