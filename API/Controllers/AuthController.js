class AuthController {
  static login(req, res) {
    res.status(200).json({
      message: "Login Success!",
    });
  }
}

export default AuthController;
