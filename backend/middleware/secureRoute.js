import jwt from "jsonwebtoken";
import { User } from "../Model/user.model.js";

const secureRoute = async (req, res, next) => {
  try {

    // console.log(req.body , " user "); 
    // console.log(req, " res")

    // const authorization = req.headers.Authorization;
    // console.log(authorization)
    // if (!authorization || !authorization.startsWith('Bearer ')) {
    //   return res.status(401).json({ error: "Token not found or invalid format" });
    // }
    // const token = authorization.split(' ')[1];

    const token = req.cookies.jwt;

    // console.log(token, "token");
    if (!token) {
      return res.status(403).json({ error: "No token, autherization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decoded.userId).select("-password")
    if (!decoded) {
      return res.status(403).json({ error: "Invalid token" });
    }
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in secureRoute", error);
    res.status(403).json({ error: "Internal server error" });
  }
};

export default secureRoute;
