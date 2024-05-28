/** @format */

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader) return res.status(401).send("Access Denied");

  const token = bearerHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

const checkAdminRole = (req, res, next) => {
  console.log("req.user:", req.user);
  console.log("Checking admin role of user:", req.user.id);
  if (req.user.role !== "admin") {
    console.log("User is not admin");
    return res.status(403).send("Access Denied. Admin role required.");
  }
  console.log("User is an admin");
  next();
};

module.exports = { verifyToken, checkAdminRole };
