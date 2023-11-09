import { configDotenv } from "dotenv";
import ResponseJSON from "../Helpers/ResponseJSON.js";
import jwt from "jsonwebtoken";

configDotenv();

class Middlware {
  static authJWT(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return ResponseJSON.unauthorized(res, "Unauthorized User!");
    }
    const token = authorization.split(" ");
    jwt.verify(token[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return ResponseJSON.unauthorized(res, "Invalid Token or Expired!");
      }
      req.userInfo = decoded;
      next();
    });
  }

  static notFound404(req, res, next) {
    ResponseJSON.notFound(res, "Route Not Found!");
  }
}

export default Middlware;
