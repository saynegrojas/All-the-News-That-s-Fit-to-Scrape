//Dependencies
const express = require('express');
const exphbs = require('express-handlebars');

//Instance of app 
const app = express();

//port
const PORT = process.env.PORT || 5000;

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//connection to server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    
})