import ContactModel from "../Models/ContactModel.js";

class ContactService {
  static async findById(id) {
    return await ContactModel.findByPk(id);
  }

  static async getAll(userId) {
    return await ContactModel.findAll({
      where: {
        UserId: userId,
      },
    });
  }

  static async create(payload) {
    return await ContactModel.create(payload);
  }

  static async update(id, payload) {
    return await ContactModel.update(payload, {
      where: {
        id: id,
      },
    });
  }

  static async delete(id) {
    return await ContactModel.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default ContactService;
