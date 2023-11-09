import ProfileModel from "../Models/ProfileModel.js";

class ProfileService {
  static async findByUserId(id) {
    return await ProfileModel.findOne({
      where: {
        profileId: id,
      },
    });
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
