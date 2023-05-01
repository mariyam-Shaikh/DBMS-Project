const mysql = require("mysql");
const express = require("express");
const { query } = require("express");

const encoder = express.urlencoded();

const app = express();
var path = require('path');
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '')));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "WINXCLUB",
    database: "euphoria"
});

connection.connect(function (err) {
    if (err) throw err
    else console.log("connected")

});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/mariyam-home.html");
});

/*
app.get("/admin", function (req, res) {
    res.sendFile(__dirname + "/login.html");
})
*/

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/register.html");

})

app.get("/ticketform", function (req, res) {
    res.sendFile(__dirname + "/ticketform.html");

})



//admin login
/*
app.post("/adminlogin", encoder, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from admin where user_name = ? and user_pass = ?", [username, password], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/dashboard");
            console.log(results);
        } else {
            res.redirect("/");
        }
        res.end();
    })
})


//student login
app.post("/studentlogin", encoder, function (req, res) {
    var username = req.body.lusername;
    var password = req.body.lpassword;
    connection.query("select * from student where user_name = ? and user_pass = ?", [username, password], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/dashboard");
            console.log(results);
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

*/

// register
app.post("/public", encoder, function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    //add confirm password later

    connection.query("insert into users(fname, lname, email, password) values(? , ?, ?, ?)", [fname, lname, email, password], function (error, result, fields) {
        if (error) {
            console.log(error);
        } else {
            // window.alert("Data has been added");
            res.redirect("/ticketform");
            console.log(result);
        }
        res.end();
    })
})

app.post("/public/ticket", encoder, function (req, res) {
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
})

app.listen(3000);

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html");
// });


// app.get("/student", function (req, res) {
//     res.sendFile(__dirname + "/student.html");

// })
// app.get("/dashboard", function (req, res) {
//     res.sendFile(__dirname + "/dashboard.html");
// })

// app.get("/login", function (req, res) {
//     res.sendFile(__dirname + "/login.html");
// })

// app.post("/adlogin", encoder, function (req, res) {
//     var username = req.body.username;
//     var password = req.body.password;
//     // console.log("select * from loginuser where user_name = ? and user_pass = ?", [username, password]);
//     connection.query("select * from loginuser where user_name = ? and user_pass = ?", [username, password], function (error, results, fields) {
//         if (results.length > 0) {
//             res.redirect("/dashboard");
//             console.log(results);
//         } else {
//             res.redirect("/");
//         }
//         res.end();
//     })
// })

// app.post("/studentlogin", encoder, function (req, res) {
//     var susername = req.body.susername;
//     var suserpass = req.body.suserpass;
//     // console.log("select * from loginuser where user_name = ? and user_pass = ?", [username, password]);
//     connection.query("select * from loginuser where user_name = ? and user_pass = ?", [susername, suserpass], function (error, results, fields) {
//         if (results.length > 0) {
//             res.redirect("/dashboard");
//             console.log(results);
//         } else {
//             res.redirect("/");
//         }
//         res.end();
//     })
// })

// app.post("/studentregs", encoder, function (req, res) {
//     var rusername = req.body.rusername;
//     var ruserpass = req.body.ruserpass;
//     // console.log("select * from loginuser where user_name = ? and user_pass = ?", [username, password]);
//     connection.query("insert into loginuser(user_name,user_pass) values(? , ?)", [rusername, ruserpass], function (error, results, fields) {
//         if (error) {
//             console.log(error);
//         } else {
//             res.redirect("/student");
//             console.log(results);
//         }
//         res.end();
//     })
// })




// app.listen(4500);
