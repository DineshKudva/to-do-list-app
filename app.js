var express = require('express');
var bodyParser = require('body-parser');

var toDoController=require('./controllers/toDoController');

var app = express();

var urlEncodedParser = bodyParser.urlencoded({ extended: false });

// set template engine:
app.set('view engine','ejs');

app.use(express.static('./public'));

toDoController.operate(app);

// listen to port 3000:
app.listen(3000, function(){
    console.log('listening to port 3000');
});
