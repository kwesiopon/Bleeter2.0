const express = require('express');
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    var payload = createPayload(req.session.user);
    res.json(payload);

})

function createPayload(userLoggedIn) {
    return {
        pageTitle: "",
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
        profileUser: userLoggedIn,
    };
}

module.exports = router;