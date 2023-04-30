const express = require("express");
const authController = require("../controller/auth.js");

const router = express.Router();

router.post('/public', authController.register);
router.post('/public/ticket', authController.ticketform);
router.post('/public/login', authController.login);
router.post('/public/shop', authController.shop);

module.exports = router;
