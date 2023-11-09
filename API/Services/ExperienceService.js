import ExperienceModel from "../Models/ExperienceModel.js";

class ExperienceService {
  static async findById(id) {
    return await ExperienceModel.findByPk(id);
  }
}

export default ExperienceService;
