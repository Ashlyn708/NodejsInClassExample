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

const mongoDB = "mongodb+srv://Ashlyn708:1Z5GwsekG569XyHL@cluster0.kgabx.mongodb.net/todolist?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
mongoose.Promise=global.Promise;
let db = mongoose.connection;

//couple of items items
var tasks=[];

var completed=[];

//get home page /
app.get('/', function(req, res){
  //query to mongoDB for todos
    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        }else{
            tasks = [];
            completed = [];
            for(i = 0; i< todo.length; i++){
                if(todo[i].done){
                    completed.push(todo[i].item)
                }else{
                    tasks.push(todo[i].item)
                }
            }
        }
    });

    //return something to home page
    res.render('index', {tasks: tasks, completed: completed}); //add completed variable to ejs ex {a:a, b:b}
}); 

//add post method/ addtask
app.post('/addtask', function(req,res){
    let newTodo = new Todo({
        item: req.body.newtask,
        done: false
    })
    newTodo.save(function(err, todo){
        if (err){
            console.log(err)
        } else {
            //return index
            res.redirect('/');
        }
    });
});

app.post('/removetask', function(req, res){
    var id = req.body.check;
    //push to completed
    if(typeof id === 'string'){
        Todo.updateOne{_id:removeTask},{done:true},function(err){
            console.log(err);
        }
    })
    }else if(typeof id === 'object'){
        for (var i = 0; i < removeTask.length; i++){
            tasks.splice(tasks.indexOf(removeTask[i]), 1);
        }
    }
    res.redirect('/');
});
app.post('/delete', function(){
    // write the function for delete using ID
    // handle for single and multiple delete requests (req.body.delete)
    // Todo.deleteOne(id, function(err){})
})
app.post()

//server setup
app.listen(port, function(){
    console.log('Listening!')
});
