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
// serve files
app.use(express.static(__dirname + '/public'));


var db = [];
var lastId = 1;

app.post('/api/items', (req,res) => {
    console.log('user made post req');
    var item = req.body;
    item.id = lastId;
    lastId += 1;
    db.push(item);

    res.status(201);
    res.json(item);
});

app.get('/api/items', (req, res) => {
    console.log("client sent get request");
    res.json(db);
})

//start server

app.listen(8080, function(){
    console.log("running on localhost:8080");
});