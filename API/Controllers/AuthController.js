import ResponseJSON from "../Helpers/ResponseJSON.js";

class AuthController {
  static login(req, res) {
    ResponseJSON.success(res, "Login Success!");
  }

  static changePassword(req, res) {
    ResponseJSON.success(res, "Change Password Success!");
  }
}

export default AuthController;
