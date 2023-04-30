const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
// const express = require("express");
// const app = express();
// // const dotenv = require("dotenv").config();
// // const cookieParser = require("cookie-parser");

// app.use(express.static('public'));
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "WINXCLUB",
    database: "euphoria"
});

//connection.query('create table if not exists ticket(fname varchar(20), lname varchar(20), Age varchar(255), Gender varchar(10), Phone_no integer(10), email varchar(255), date varchar(10)');
    
exports.register = async function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    //add confirm password later
    //to check if email is already in use
    connection.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                req.flash('error', 'The email is already in use!');
                return res.redirect("/register");
            }
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        connection.query("insert into users(fname, lname, email, password) values(?, ?, ?, ?)", [fname, lname, email, hashedPassword], async function (error, result, fields) {
            if (error) {
                console.log(error);
            } else {
                //console.log(error);
                req.flash('success', 'User Registered!');
                return res.redirect("/register");
            }
        })
    })
}

exports.ticketform = async function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var Age = req.body.Age;
    var Gender = req.body.Gender;
    var email = req.body.email;
    var date = req.body.date;
    var Phone_no = req.body.Phone_no;
    //add confirm password later

    connection.query("insert into ticket(fname, lname, Age, Gender, Phone_no, email, date) values(?, ?, ?, ?, ?, ?, ?)", [fname, lname, Age, Gender, Phone_no, email, date], function (errors, results, fields) {
        if (errors) {
            console.log(errors);
        } else {
            // window.alert("Data has been added");
            res.redirect("/");
            console.log(results);
        }
        res.end();
    })
}


//DO THIS LOGIN 

exports.login = async function (req, res) {
    try {
        var email = req.body.email;
        var password = req.body.password;
        // if (!email || !password) {
        //         req.flash('error', 'Please Provide an email or password!');
        //         return res.redirect("/");
        //         //res.status(204).send();
        // }
        connection.query('SELECT * from users WHERE email = ?', [email], async (err, results) => {
            // console.log(results[0]);
            if (!results || !results.length || !await bcrypt.compare(password, results[0].password)) {
                req.flash('error', 'Email or password doesn\'t match!');
                return res.redirect("/");

            } else {
                // req.flash('success', 'Successfully logged in!');
                 return res.redirect("/ticketform");
                // connection.query('SELECT * from users WHERE email = ?', [email], async (err, result) => {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         //console.log(result);
                //         req.flash('success', 'Successfully logged in!');
                //         return res.render("/ticketform");
                //     }
                //  });
                // return res.status(200).redirect=("/dashboard");
            }
        })
    } catch (err) {
        console.log(err);
    }
}

exports.shop = async function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var contact = req.body.contact;
    var email = req.body.email;
    var license = req.body.license;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var start = req.body.start;
    var end = req.body.end;
    var type = req.body.type;
    var no_workers = req.body.no_workers;
    var shop_name = req.body.shop_name;
    var about = req.body.about;


    connection.query("insert into shop(fname, lname, contact, email, license, address1, address2, city, state, zip, start, end, no_shop, type, no_workers, shop_name, about) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [fname, lname, contact, email, license, address1, address2, city, state, zip, start, end, no_shop, type, no_workers, shop_name, about], function (errors, results, fields) {
        if (errors) {
            console.log(errors);
        } else {
            // window.alert("Data has been added");
            res.redirect("/");
            console.log(results);
        }
        res.end();
    })
}
