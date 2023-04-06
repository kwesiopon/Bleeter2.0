const express = require('express');
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

router.get("/:id", (req, res, next) => {

    /** var payload = {
        pageTitle: "View post",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        postId: req.params.id
    } **/
    
    res.status(200).sendFile(path.join(__dirname, '/../views', 'postPage.html'));
})

module.exports = router;