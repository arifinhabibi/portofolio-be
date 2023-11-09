import EducationModel from "../Models/EducationModel.js";

class EducationService {
  static async findById(id) {
    return await EducationModel.findByPk(id);
  }
}

export default EducationService;
