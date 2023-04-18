const express = require("express");
const authController = require("../controller/auth.js");

const router = express.Router();
// router.get('/', (req, res) => {
//     res.render("mariyam");
// });

// router.get('/register', (req, res) => {
//     res.render("register", {error : req.flash('error'), success : req.flash('success')})
// });


// router.get('/register', (req, res) => {
//     res.render("register", {error : req.flash('error'), success : req.flash('success')})
// });

router.get("/", function (req, res) {
    res.render("mariyam-home", {error : req.flash('error'), success : req.flash('success')});
});


router.get("/register", function (req, res) {
    res.render("register", {error : req.flash('error'), success : req.flash('success')})
});

router.get("/ticketform", function (req, res) {
    res.render("ticketform");
});
router.get("/login", function (req, res) {
    res.render("login", {error : req.flash('error'), success : req.flash('success')})
});

module.exports = router;
