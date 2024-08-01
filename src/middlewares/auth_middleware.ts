// @ts-nocheck
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserService from "../services/user/user.service";
import DotenvConfiguration from "../config/env.config";

const userService = UserService;

export const authMiddleware = (roles: string[] = []) => {
  console.log("auth middleware", roles);
  return asyncHandler(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      console.log("token", token);

      try {
        if (token) {
          const decoded = jwt.verify(
            token,
            DotenvConfiguration.ACCESS_TOKEN_SECRET
          );
          console.log("decoded", decoded);

          req.user = await userService.getOne(decoded.id);

          // If roles array is not empty, we check if the user's role matches any of the given roles
          if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({
              message: "Access is forbidden, insufficient permissions",
              success: false,
              data: null,
            });
          }
          next();
        }
      } catch (err) {
        return res.status(401).json({
          message:
            "Not authorized, token expired or invalid, please login again",
          success: false,
          data: null,
        });
      }
    } else {
      return res.status(401).json({
        message: "Not authorized, token expired or invalid, please login again",
        success: false,
        data: null,
      });
    }
  });
};
export const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  //   const adminUser = await User.findOne({ email: email });
  //   if (adminUser && adminUser.role === "admin") {
  //     next();
  //   } else {
  //     return res.status(401).json({ message: "User is not an admin" });
  //   }
  next();
});
