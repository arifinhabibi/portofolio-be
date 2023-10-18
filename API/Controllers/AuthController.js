import ResponseJSON from "../Helpers/ResponseJSON.js";

class AuthController {
  static login(req, res) {
    ResponseJSON.success(res, "Login Success!");
  }
}

export default AuthController;
