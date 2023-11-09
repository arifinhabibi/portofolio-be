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

  static async findById(id) {
    return await UserModel.findByPk(id);
  }

  static async update(userId, payload) {
    const update = await UserModel.update(payload, {
      where: {
        id: userId,
      },
    });

    return update;
  }
}

export default UserService;
