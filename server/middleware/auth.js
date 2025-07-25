import jwt from "jsonwebtoken";
import User from "../models/User.js";


//  Protect Route Middleware
export const protect = async (req, res, next) => {
  let token;
    // console.log('Authorization header:', req.headers.authorization); 


  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

       req.user = await User.findById(decoded.userId || decoded.id).select("-password");

      

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      console.error("Auth middleware error:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

//  Role-based Access Middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied for role: ${req.user.role}` });
    }
    next();
  };
};

// authMiddleware.js


export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This must include _id
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};