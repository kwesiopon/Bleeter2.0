const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
const bodyParser = require("body-parser")
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

app.use(express.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    
    res.status(200).sendFile(path.join(__dirname, '/../views', 'login.html'));
})

router.post("/", async (req, res, next) => {
    
    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword)
    {
        var user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            //res.status(200).render("login", payload);
            res.status(200).sendFile(path.join(__dirname, 'views', 'login.html'));
            
        });

        if(user != null)
        {
            var result = await bcrypt.compare(req.body.logPassword, user.password);

            if(result === true)
            {
                req.session.user = user;
                return res.redirect("/");
            }
        }

        payload.errorMessage = "Login credentials incorrect.";
        //return res.status(200).render("login", payload);
        res.status(200).sendFile(path.join(__dirname, 'views', 'login.html'));
        
    }
    
    payload.errorMessage = "Make sure each field has a valid value";
    //res.status(200).render("login");
    res.status(200).sendFile(path.join(__dirname, 'views', 'login.html'));
})

module.exports = router;