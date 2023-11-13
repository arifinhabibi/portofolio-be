import SkillModel from "../Models/SkillModel.js";

class SkillService {
  static async findById(id) {
    return await SkillModel.findByPk(id);
  }

  static async getAll(userId) {
    return await SkillModel.findAll({
      where: {
        UserId: userId,
      },
    });
  }

  static async create(payload) {
    return await SkillModel.create(payload);
  }

  static async update(id, payload) {
    return await SkillModel.update(payload, {
      where: {
        id: id,
      },
    });
  }

  static async delete(id) {
    return await SkillModel.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default SkillService;
