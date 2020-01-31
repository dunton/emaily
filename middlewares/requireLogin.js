module.exports = (req, res, next) => {
  // check if user signed in
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" }); // 401 equals unauthorized
  }

  next();
};
