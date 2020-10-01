//require express
var express = require('express');
//require body-paser
var bodyParser = require("body-parser");
//require mongoose
var mongoose = require("mongoose");

//create express object, call express
var app = express();
//get port information
const port = process.env.PORT || 3000;


//tell application to use EJS for templetes
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended:true}))

//connection information for Mongo

const mongoDB = 'mongodb+srv://testConnection:b8RwqJYgo4hD1xhe@nodetodoexample-iqnde.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise=global.Promise;
let db = mongoose.connection;

//couple of items items
var tasks=["make it to class","take child to daycare"];

var completed=["extrawork"];

//get home page /
app.get('/', function(req, res){
    //return something to home page
    res.render('index',{task:task});
    res.render('index',{completed:completed});
});

//add post method/ addtask
app.post('/addtask', function(req,res){
    var newTask = req.body.newTask;
    console.log("newTask");
    tasks.push(newTask);
    //return index
    res.render('index');
});

app.post('/removetask', function(req, res){
    var removeTask = req.body.check;
    //push to completed
    if(typeof removeTask === 'string'){
        tasks.splice(tasks.indexOf(removeTask), 1);
        completed.push(removeTask);
    }else if(typeof removeTask === 'object'){
        for (var i = 0; i < removeTask.length; i++){
            tasks.splice(tasks.indexOf(removeTask[i]), 1);
        }
    }
    res.redirect('/');
});

app.post()

//server setup
app.listen(port, function(){
    console.log('Listening!')
});
