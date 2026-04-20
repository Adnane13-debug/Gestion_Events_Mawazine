const checkRole = (req, res, next) => {

    // if user role does not match then block
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: `Access denied. Admins only.` })
    }

    // if role matches then continue
    next()
}


module.exports = checkRole;