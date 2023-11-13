import CertificateModel from "../Models/CertificateModel.js";

class CertificateService {
  static async findById(id) {
    return await CertificateModel.findByPk(id);
  }

  static async getAll() {
    return await CertificateModel.findAll();
  }

  static async create(payload) {
    return await CertificateModel.create(payload);
  }

  static async update(id, payload) {
    return await CertificateModel.update(payload, {
      where: {
        id: id,
      },
    });
  }

  static async delete(id) {
    return await CertificateModel.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default CertificateService;
