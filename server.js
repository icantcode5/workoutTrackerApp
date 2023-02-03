const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");
//const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")//(session); no longer need this in the new version of MongoStore
//const methodOverride = require("method-override");
//const flash = require("express-flash"); 
//const logger = require("morgan");
const connectDB = require("./config/database");
//const mainRoutes = require("./routes/main");
const workoutRoutes = require("./routes/workout")
const userRoutes = require("./routes/user");
const testRoute = require("./routes/test")


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
 
// Passport config
//require("./config/passport")(passport);

//Connect To Database
connectDB(); 

//Using EJS for views
//app.set("view engine", "html"); //changed from ejs to html

//Static Folder
//app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

//Logging
//app.use(logger("dev"));

//Use forms for put / delete
//app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false, 
    saveUninitialized: false,
    //store property has been updated and can be found in docs
    store: MongoStore.create( { mongoUrl: process.env.DB_STRING } ),
  })
);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//Use flash messages for errors, info, ect...
//app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("https://workouttrackerapp-production.up.railway.app",testRoute)
app.use("/users", userRoutes);
app.use("/workout", workoutRoutes);
//app.use("/comment", commentsRoutes)

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

