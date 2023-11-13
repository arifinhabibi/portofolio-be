import ProjectModel from "../Models/ProjectModel.js";

class ProjectService {
  static async findById(id) {
    return await ProjectModel.findByPk(id);
  }

  static async getAll() {
    return await ProjectModel.findAll();
  }

  static async create(payload) {
    return await ProjectModel.create(payload);
  }

  static async update(id, payload) {
    return await ProjectModel.update(payload, {
      where: {
        id: id,
      },
    });
  }

  static async delete(id) {
    return await ProjectModel.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default ProjectService;
