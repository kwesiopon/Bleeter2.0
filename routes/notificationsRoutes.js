const express = require('express');
const app = express();
const path = require("path")
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const User = require('../schemas/UserSchema');

router.get("/", (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '/../views', 'notificationsPage.html'));
})

module.exports = router;