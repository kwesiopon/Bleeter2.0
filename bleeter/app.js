/**
 * @constant io is being used in /public/js/clientSocket.js
 * Socket.IO on the client connected back via @constant port = XXXX;
 */
const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require("./database");
const session = require('express-session');
//const io = require("socket.io"); //CAN BE DELETED

const server = app.listen(port, () => console.log("Server listening on port " + port));
const io = require("socket.io")(server, { pingTimeout: 60000 });


app.use(express.urlencoded({ extended: false })); //app.use(bodyParser.urlencoded({ extended: false })); //bodyParser deprecated in Express v4.16+ // amended for ./routes/{loginRoutes, logout}.js
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
	secret: "beef cake",
	resave: true,
	saveUninitialized: false
}))

// Routes
const payloadRoute = require("./routes/payloadRoutes");
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');
const postRoute = require('./routes/postRoutes');
const profileRoute = require('./routes/profileRoutes');
const uploadRoute = require('./routes/uploadRoutes');
const notificationsRoute = require('./routes/notificationsRoutes');

// API Routes
const postsApiRoute = require('./routes/api/postsAPI');
const usersApiRoute = require('./routes/api/usersAPI');
const notificationsApiRoute = require('./routes/api/notificationsAPI');


//Use Routes
app.use("/payload", middleware.requireLogin, payloadRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/posts", middleware.requireLogin, postRoute);
app.use("/profile", middleware.requireLogin, profileRoute);
app.use("/uploads", uploadRoute);
app.use("/notifications", middleware.requireLogin, notificationsRoute);

//Use API Routes
app.use("/api/posts", postsApiRoute);
app.use("/api/users", usersApiRoute);
app.use("/api/notifications", notificationsApiRoute);


app.get("/", middleware.requireLogin, (req, res, next) => {
    
    res.status(200).sendFile(path.join(__dirname, 'views', 'home.html'));
    

})