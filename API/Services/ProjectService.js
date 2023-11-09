import ProjectModel from "../Models/ProjectModel.js";

class ProjectService {
  static async findById(id) {
    return await ProjectModel.findByPk(id);
  }
}

export default ProjectService;
