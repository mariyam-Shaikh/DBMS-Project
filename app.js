const mysql = require("mysql");
const express = require("express");
// const { query } = require("express");
const flash = require("connect-flash");
// const encoder = express.urlencoded();
const session = require("express-session");
var path = require('path');
const app = express();
// const cookieParser = require("cookie-parser");
app.set('view engine', 'ejs');

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(session({
    secret: 'secret',
    cookie: {secure: false, maxAge: 60000},
    resave:false,
    saveUninitialized: false
}));

app.use(flash());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "WINXCLUB",
    database: "euphoria"
});


connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("mysql connected")
    }
});

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/', require('./routes/auth'));


app.listen(3000);
