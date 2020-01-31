const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const cookieSession = require("cookie-session"); // import cookie session
const passport = require("passport"); // import passport
const bodyParser = require("body-parser"); // import body-parser
const keys = require("./config/keys"); // import keys
require("./models/User"); // import in User model schema, so it executes
require("./models/Survey"); // import in Survey model schema, so it executes
require("./services/passport"); // import passport.js file, this makes it execute

mongoose.connect(keys.mongoURI);
const app = express(); // generate new express app

/*
  app.use calls are middlewares take take incoming request and makes
  small but in crucial changes to it. Preprocessing of incoming requests.
  Great spot to put in logic that is used in many handlers
*/

// bodyParser will parse every request incoming request to json
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// call authRoutes, billingRoutes functions
// returns function then immediately calls function with app object
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // EXPRESS will serve up production assets like our main.js or main.css file
  // handles from react router
  app.use(express.static("client/build"));
  // EXPRESS will serve up the index.html file if it doesnt recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
// tells NODE to listen on Port 5000
app.listen(PORT);
