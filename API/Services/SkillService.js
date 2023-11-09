import SkillModel from "../Models/SkillModel.js";

class SkillService {
  static async findById(id) {
    return await SkillModel.findByPk(id);
  }
}

export default SkillService;
