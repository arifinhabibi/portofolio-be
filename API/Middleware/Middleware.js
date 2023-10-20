import { configDotenv } from "dotenv";
import ResponseJSON from "../Helpers/ResponseJSON.js";
import jwt from "jsonwebtoken";

configDotenv();

class Middlware {
  static authJWT(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return ResponseJSON.unauthorized(res, "Unauthorized User!");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return ResponseJSON.unauthorized(res, "Invalid Token!");
    }
  }

  static notFound404(req, res, next) {
    ResponseJSON.notFound(res, "Route Not Found!");
  }
}

export default Middlware;
