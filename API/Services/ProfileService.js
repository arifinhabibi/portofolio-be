import ProfileModel from "../Models/ProfileModel.js";

class ProfileService {
  static async getAll() {
    return await ProfileModel.findAll();
  }

  static async findByUserId(id) {
    return await ProfileModel.findOne({
      where: {
        profileId: id,
      },
    });
  }

  static async create(payload) {
    return await ProfileModel.create(payload);
  }

  static async updateByUserId(userId, payload) {
    return ProfileModel.update(payload, {
      where: {
        profileId: userId,
      },
    });
  }
}

export default ProfileService;
