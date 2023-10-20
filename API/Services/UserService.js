import UserModel from "../Models/UserModel.js";

class UserService {
  static async findByUsername(username) {
    const user = await UserModel.findOne({
      where: {
        username: username,
      },
      attributes: {
        exclude: ["token", "createdAt", "updatedAt"],
      },
      include: ["profile"],
    });
    return user;
  }
}

export default UserService;
