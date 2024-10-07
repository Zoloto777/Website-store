import userModel from "../models/userModel.js"

const checkRole = (roles) => {
  return (req, res, next) => {
    const user = userModel.findById(req.id);
    console.log(user)
    if (roles.includes(user.role)) {
      next(); // User has one of the required roles, proceed
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
  };
};

export default checkRole