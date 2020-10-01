//require express
var express = require('express');
//require body-paser
var bodyParser = require("body-parser");

//create express object, call express
var app = express();

//tell application to use EJS for templetes
app.set('view engine', 'ejs');
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended:true}))

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
app.listen(3000, function(){
    console.log('Listening!')
});
