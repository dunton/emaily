const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  // watch for POST requests sent to api/stripe route
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      // create call returns a Promise
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    // add 5 credits to user model then send user model back to client
    req.user.credits += 5; // communicating with DB
    const user = await req.user.save();
    res.send(user); // send response
  });
};
