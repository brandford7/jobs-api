const User = require("../models/User");

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(400).json("Unauthenticated");
  }
  //split auth header into an array and get the second item in the resulting array
  const token = authHeader.split(" ")[1];

  try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId , name:payload.name}
      next()
  } catch (err) {
       res.status(400).json("Unauthenticated");
  }
};


module.exports=authMiddleware