import EducationModel from "../Models/EducationModel.js";

class EducationService {
  static async findById(id) {
    return await EducationModel.findByPk(id);
  }

  static async getAll(userId) {
    return await EducationModel.findAll({
      where: {
        UserId: userId,
      },
    });
  }

  static async create(payload) {
    return await EducationModel.create(payload);
  }

  static async update(id, payload) {
    return await EducationModel.update(payload, {
      where: {
        id: id,
      },
    });
  }

  static async delete(id) {
    return await EducationModel.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default EducationService;
