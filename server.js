//Dependencies
//====================
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//Set up express app
//====================

//Instance of app 
const app = express();

//port
const PORT = process.env.PORT || 5000;

//connect handlebars to express app
//====================

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//body parser
//====================

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//static public folder directorty
app.use(express.static(__dirname + '/public'));

//routes
//====================

require('./config/routes')(app);

//local mongodb headlines
//====================

const db = process.env.MONGO_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to db
mongoose.connect(db, (err) =>{
    if(err) throw err;
    console.log('mongoose connection successful');
    
})

//connection to server
//====================

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    
})