var express = require('express');
var app = express();

//enable CORS

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type,Accept");
    next();
});

//config body parser to read request payload


var bparser = require('body-parser');
app.use(bparser.json());

//Render with EJS

var ejs = require('ejs');
app.set('views', __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

//web server response

app.get('/', function(req, res){
    res.render('index.html');
});
app.get('/index', function(req, res){
    res.render('index.html');
});

app.get('/admin', function(req, res){
    res.render('admin.html');
});
app.get('/about', function(req, res){
    res.render('about.html');
});
app.get('/contact', function(req, res){
    res.render('contact.html');
});
// server files
app.use(express.static(__dirname + '/public'));

//DB connections

var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var mongoDb = mongoose.connection;

var itemDb; // constructor for db objs
//

var db = [];
var lastId = 1;

app.post('/api/items', (req,res) => {
    console.log('user made post req');
    //read request
    //create DB Object
    var itemMongo = itemDb(req.body);
    //save Obj on DB
    itemMongo.save(function(error, savedItem){
        if(error){
            console.log("Save failed" + error);
            res.status(500);
            res.send(error);
        }
        res.status(201);
        res.json(savedItem);
    });
    //get response, respond to client

});

app.get('/api/items', (req, res) => {
    console.log("client sent get request");
    itemDb.find({}, function(error, data){
        if(error){
            res.status(500);
            res.send(error);
        }
        res.status(201);
        res.json(data);
    });
});
app.get('/api/items/:user', (req, res) => {
    let name = req.params.user;
    itemDb.find({ user: name}, function(error, data){
        if(error){
            res.status(500);
            res.send(error);
        }
        res.status(201);
        res.json(data);
    });
});
app.get('/api/items/search/:text', (req, res) => {
    var text = req.params.text;
    itemDb.find(
        {
        $or: [
            {title: { "$regex": text, "$options": "i"} },
                    { description: { "$regex": text, "$options": "i" } }
            ],
            function(error, data){
        if(error){
            res.status(500);
            res.send(error);
        }
        res.status(201);
        res.json(data);
    }});
});

mongoDb.on('error', function(error){
    console.log("error with DB connection" + error);
});

mongoDb.on('open', function(){
    console.log('connection successfully opened');

    //define MongoDB Schema
    var itemSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        user: String
    });

    itemDb = mongoose.model("catCohort8",itemSchema);
});

//start server

app.listen(8080, function(){
    console.log("running on localhost:8080");
});