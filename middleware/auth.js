const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

  // get the token from the header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // if no token then block access
  if (!token) {
    return res.status(401).json({ message: 'No token, access denied' })
  }

  // if token exists then verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // save user info for next steps
    next() // continue to the route
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

module.exports = auth;