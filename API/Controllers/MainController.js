import ResponseJSON from "../Helpers/ResponseJSON.js";
import ProfileService from "../Services/ProfileService.js";

class MainController {
  // profiles
  static getProfile(req, res) {
    const id = req.params.id;
    const profile = ProfileService.findByUserId(id);

    profile
      .then((data) => {
        return ResponseJSON.successWithData(res, "success load data!", data);
      })
      .catch((err) => {
        return ResponseJSON.unauthorized(res, "user is undefinded!");
      });
  }
  static getAllProfile() {}
  static createProfile() {}
  static updateProfile(id) {}
  static deleteProfile(id) {}
  // experiences
  static getExperience(id) {}
  static getAllExperience() {}
  static createExperience() {}
  static updateExperience(id) {}
  static deleteExperience(id) {}
  // projects
  static getProject(id) {}
  static getAllProject() {}
  static createProject() {}
  static updateProject(id) {}
  static deleteProject(id) {}
  // educations
  static getEducation(id) {}
  static getAllEducation() {}
  static createEducation() {}
  static updateEducation(id) {}
  static deleteEducation(id) {}
  // certificates
  static getCertificate(id) {}
  static getAllCertificate() {}
  static createCertificate() {}
  static updateCertificate(id) {}
  static deleteCertificate(id) {}
  // contacts
  static getContact(id) {}
  static getAllContact() {}
  static createContact() {}
  static updateContact(id) {}
  static deleteContact(id) {}
  // skills
  static getSkill(id) {}
  static getAllSkill() {}
  static createSkill() {}
  static updateSkill(id) {}
  static deleteSkill(id) {}
}

export default MainController;
