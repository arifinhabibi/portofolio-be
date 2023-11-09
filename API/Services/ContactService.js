import ContactModel from "../Models/ContactModel.js";

class ContactService {
  static async findById(id) {
    return await ContactModel.findByPk(id);
  }
}

export default ContactService;
