//The require(‘mongoose’) call above returns a Singleton object. 
//It means that the first time you call require(‘mongoose’), it 
//is creating an instance of the Mongoose class and returning it. 
//On subsequent calls, it will return the same instance that was 
//created and returned to you the first time because of how module 
//import/export works in ES6.
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
const uri ="mongodb+srv://aopon:Passwordagain@cluster0.eofiyx6.mongodb.net/?retryWrites=true&w=majority"

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(uri)
        .then(() => {
            console.log("database connection successful");
        })
        .catch((err) => {
            console.log("database connection error " + err.log);
        })
    }
}

module.exports = new Database();
