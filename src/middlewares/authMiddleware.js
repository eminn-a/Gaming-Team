const jwt = require("../lib/jwt");
const { SECRET, TOKEN_KEY } = require("../config/config");

exports.auth = async (req, res, next) => {
  const token = req.cookies[TOKEN_KEY];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      console.log(decodedToken);
      req.user = decodedToken;
      next();
    } catch (err) {
      res.clearCookie(TOKEN_KEY);
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};