import { configDotenv } from "dotenv";
import ResponseJSON from "../Helpers/ResponseJSON.js";
import UserService from "../Services/UserService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
configDotenv();

class AuthController {
  static login(req, res) {
    const payload = req.body;
    const user = UserService.findByUsername(payload.username);

    user
      .then((data) => {
        bcrypt.compare(payload.password, data.password, async (err, result) => {
          if (result) {
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
              expiresIn: "5h",
            });
            return ResponseJSON.successWithData(res, "Login Success!", {
              userInfo: data.profile,
              token: token,
            });
          } else {
            return ResponseJSON.badRequest(
              res,
              "Bad Request!",
              "Wrong Password!"
            );
          }
        });
      })
      .catch(() => {
        return ResponseJSON.badRequest(
          res,
          "Bad Request",
          "Username " + payload.username + " not found!"
        );
      });
  }

  static logout() {
    ResponseJSON.success(res, "Logout Success!");
  }

  static changePassword(req, res) {
    ResponseJSON.success(res, "Change Password Success!");
  }
}

export default AuthController;
