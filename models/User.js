const mongoose = require("mongoose"); // import mongoose
const { Schema } = mongoose; // get Schema from mongoose

// create schema for collection
const userSchema = new Schema({
  googleId: String, // assigning googleID string property
  facebookId: String, // assigning facebookId a string property
  credits: { type: Number, default: 0 } // assigning credits a number property that defaults to 0
});

// tells mongoose to create new collection called 'users'
// if it already exists it ignores this
mongoose.model("users", userSchema);
