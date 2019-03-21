var express = require('express');
var bodyParser = require('body-parser');
var authen = require('./controllers/authen');
var session = require("client-sessions");
//var cookieParser = require('cookie-parser');
var app = express();

//Use ejs
app.set("view engine", "ejs");
//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({cookieName: 'session',secret: 'something', secure: false}));


//Demo registration
demoRegister("John Doe", "12345");
demoRegister("Jane Doe", "54321");

//initial page
app.get("/", authen.get);
        
//Register user
app.post('/register', authen.register);

//Login user
app.post('/login', authen.login);

//submit new task
app.post('/newtodo', authen.newtodo);

//remove task
app.post('/removetodo', authen.removetodo);


// start web server
app.listen(3004, ()=> {
    console.log('Connected to MongoDB Server, WebService running on port 3004')
});












