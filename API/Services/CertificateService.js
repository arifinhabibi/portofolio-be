import CertificateModel from "../Models/CertificateModel.js";

class CertificateService {
  static async findById(id) {
    return await CertificateModel.findByPk(id);
  }
}

export default CertificateService;
