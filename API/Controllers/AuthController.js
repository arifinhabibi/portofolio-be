import { configDotenv } from "dotenv";
import ResponseJSON from "../Helpers/ResponseJSON.js";
import UserService from "../Services/UserService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ProfileService from "../Services/ProfileService.js";
configDotenv();

class AuthController {
  static login(req, res) {
    const payload = req.body;
    const user = UserService.findByUsername(payload.username);

    user
      .then((data) => {
        bcrypt.compare(payload.password, data.password, async (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                userId: data.id,
                username: data.username,
                role: data.role,
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "5h",
              }
            );
            UserService.update(data.id, { token: token });
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

  static logout(req, res) {
    const userInfo = req.userInfo;
    const user = UserService.findById(userInfo.userId);

    user
      .then((data) => {
        UserService.update(data.id, { token: null });
        ProfileService.updateByUserId(data.id, { last_login: Date.now() });
        ResponseJSON.success(res, "Logout Success!");
      })
      .catch(() => {
        ResponseJSON.unauthorized(res, "Unauthorized User");
      });
  }

  static changePassword(req, res) {
    const userInfo = req.userInfo;
    const payload = req.body;
    const user = UserService.findById(userInfo.userId);
    user
      .then((data) => {
        bcrypt.compare(payload.oldPass, data.password, (err, result) => {
          if (err) {
            return ResponseJSON.unauthorized(res, "Unauthorized User!");
          }
          UserService.update(data.id, { password: payload.newPass });
          ResponseJSON.success(res, "Change Password Success!");
        });
      })
      .catch(() => {
        return ResponseJSON.unauthorized(res, "Unauthorized User!");
      });
  }
}

export default AuthController;
