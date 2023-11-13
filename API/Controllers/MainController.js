import generateOTPCode from "../Helpers/GenerateOTPCode.js";
import ResponseJSON from "../Helpers/ResponseJSON.js";
import ProfileService from "../Services/ProfileService.js";
import UserService from "../Services/UserService.js";
import bcrypt from "bcrypt";

class MainController {
  // profiles
  static getProfile(req, res) {
    const id = req.params.userId;
    const profile = ProfileService.findByUserId(id);

    profile
      .then((data) => {
        return ResponseJSON.successWithData(res, "success load data!", data);
      })
      .catch((err) => {
        return ResponseJSON.unauthorized(res, "profile user is undefinded!");
      });
  }
  static getAllProfile(req, res) {
    const profiles = ProfileService.getAll();

    profiles
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch((err) => {
        return ResponseJSON.notFound(res, "data can't founded!");
      });
  }
  static createProfile(req, res) {
    const payload = req.body;

    if (
      !payload.fullname ||
      !payload.username ||
      !payload.password ||
      !payload.email
    ) {
      const errFullname = {
        fullname: "must be required",
      };
      const errUsername = {
        username: "must be required",
      };
      const errPassword = {
        password: "must be required",
      };
      const errEmail = {
        email: "must be required",
      };
      const errors = Object.assign(
        !payload.fullname ? errFullname : {},
        !payload.username ? errUsername : {},
        !payload.password ? errPassword : {},
        !payload.email ? errEmail : {}
      );
      return ResponseJSON.badRequest(res, "bad request", errors);
    }

    UserService.findByUsername(payload.username).then((data) => {
      if (data) {
        return ResponseJSON.forbidden(
          res,
          "username is founded and can't duplicate, please using another name."
        );
      }

      UserService.create({
        username: payload.username,
        password: bcrypt.hashSync(payload.password, 16),
        otp_code: generateOTPCode(4),
      })
        .then((user) => {
          payload.profileId = user.id;
          ProfileService.create(payload)
            .then(() => {
              return ResponseJSON.success(res, "created data successfully");
            })
            .catch((err) => {
              return ResponseJSON.badRequest(res, "error!", err);
            });
        })
        .catch((err) => {
          return ResponseJSON.forbidden(res, "error");
        });
    });
  }
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
