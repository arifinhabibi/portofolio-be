import ExperienceModel from "../Models/ExperienceModel.js";

class ExperienceService {
  static async findById(id) {
    return await ExperienceModel.findByPk(id);
  }

  static async getAll() {
    return await ExperienceModel.findAll();
  }

  static async updateById(id, payload) {
    return await ExperienceModel.update(payload, {
      where: {
        id: id,
      },
    });
  }

  static async delete(id) {
    return await ExperienceModel.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default ExperienceService;
