//require express
var express = require('express');
//require body-paser
var body = require("body-parser");

//create express object, call express
var app = express();

//tell application to use EJS for templetes
app.set('view engine', 'ejs');
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended:true}))

//couple of items items
var tasks=["make it to class","take child to daycare"];

//get home page /
app.get('/', function(req, res){
    //return something to home page
    res.render('index');
});

//add post method/ addtask
app.post('/addtask', function(req,res){
    var newTask = req.body.newTask;
    console.log("newTask")
    //return index
    res.render('index');
});

//server setup
app.listen(3000, function(){
    console.log('Listening!')
});
