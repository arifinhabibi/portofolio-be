import UserModel from "../Models/UserModel.js";

class UserService {
  static async findByUsername(username) {
    return await UserModel.findOne({
      where: {
        username: username,
      },
      attributes: {
        exclude: ["token", "createdAt", "updatedAt"],
      },
      include: ["profile"],
    });
  }

  static async findById(id) {
    return await UserModel.findByPk(id);
  }

  static async create(payload){
    return await UserModel.create(payload)
  }
  static async update(userId, payload) {
    return await UserModel.update(payload, {
      where: {
        id: userId,
      },
    });

  }
}

export default UserService;
