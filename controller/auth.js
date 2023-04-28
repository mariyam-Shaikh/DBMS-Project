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

        connection.query("insert into users(fname, lname, email, password) values(?, ?, ?, ?)", [fname, lname, email, password], async function (error, result, fields) {
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
    var age = req.body.age;
    var gender = req.body.gender;
    var email = req.body.email;
    var date = req.body.date;
    //add confirm password later


    connection.query("insert into ticket(fname, lname, age, gender, email, date) values(?, ?, ?, ?, ?, ?)", [fname, lname, age, gender, email, date], function (errors, results, fields) {
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
        if (!email || !password) {
                req.flash('error', 'Please Provide an email or password!');
                return res.redirect("/");
        }
        connection.query('SELECT * from users WHERE email = ?', [email], async (err, results) => {
            console.log(results[0]);
            if (!results || !results.length || !await bcrypt.compare(password, results[0].password)) {
                req.flash('error', 'Email does not exist!');
                return res.redirect("/");

            } else {
                connection.query('SELECT * from student WHERE email = ?', [email], async (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        //console.log(result);
                        req.flash('success', 'Successfully logged in!');
                        return res.render("/ticketform");
                    }
                 });
                // return res.status(200).redirect=("/dashboard");
            }
        })
    } catch (err) {
        console.log(err);
    }
}
