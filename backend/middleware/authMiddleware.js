import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // why decoded.id because we are taken from jwt, and its called id
      req.user = await User.findById(decoded.id).select("-password");
      //   select('-password') -> dont include password
      // req.user -> every req(request) now will have information about the user

      //   res.send(req.user);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
  if (!authorization) {
    res.status(401);

    throw new Error("Not authorized, no token");
  }
});

const adminAuth = (req, res, next) => {
  const adminUser = req.user.isAdmin;
  if (adminUser === true) {
    // console.log("adminUser === true", adminUser === true);
    // res.send(adminUser);
    next();
  } else {
    res.status(401);
    throw new Error("Not authorzied as an admin");
  }
};
export { protect, adminAuth };
