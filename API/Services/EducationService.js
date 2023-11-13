import EducationModel from "../Models/EducationModel.js";

class EducationService {
  static async findById(id) {
    return await EducationModel.findByPk(id);
  }

  static async getAll() {
    return await EducationModel.findAll();
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
