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
    UserService.findByUsername(payload.username)
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
    UserService.findById(userInfo.userId)
      .then((data) => {
        if (data == null) {
          ResponseJSON.unauthorized(res, "Unauthorized User");
        }
        UserService.update(data.id, { token: null });
        ProfileService.updateByUserId(data.id, { last_login: Date.now() });
        ResponseJSON.success(res, "Logout Success!");
      })
  }

  static changePassword(req, res) {
    const userInfo = req.userInfo;
    const payload = req.body;
    UserService.findById(userInfo.userId).then((data) => {
      if (data == null) {
        return ResponseJSON.unauthorized(res, "Unauthorized User!");
      }

      bcrypt.compare(payload.oldPass, data.password, (err, result) => {
        if (!result) {
          return ResponseJSON.forbidden(res, "wrong password!");
        }

        UserService.update(data.id, {
          password: bcrypt.hashSync(payload.newPass, 16),
        }).then(() => {
          ResponseJSON.success(res, "Change Password Success!");
        });
      });
    });
  }
}

export default AuthController;
