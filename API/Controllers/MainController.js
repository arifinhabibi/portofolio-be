import generateOTPCode from "../Helpers/GenerateOTPCode.js";
import ResponseJSON from "../Helpers/ResponseJSON.js";
import CertificateService from "../Services/CertificateService.js";
import ContactService from "../Services/ContactService.js";
import EducationService from "../Services/EducationService.js";
import ExperienceService from "../Services/ExperienceService.js";
import ProfileService from "../Services/ProfileService.js";
import ProjectService from "../Services/ProjectService.js";
import SkillService from "../Services/SkillService.js";
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
  static updateProfile(req, res) {
    const payload = req.body;
    const userId = req.params.userId;

    ProfileService.updateByUserId(userId, payload)
      .then(() => {
        return ResponseJSON.success(res, "update data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }

  // experiences
  static getExperience(req, res) {
    const id = req.params.id;

    ExperienceService.findById(id)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static getAllExperience(req, res) {
    ExperienceService.getAll()
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createExperience(req, res) {
    const payload = req.body;

    ExperienceService.create(payload)
      .then(() => {
        return ResponseJSON.success(res, "create data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static updateExperience(req, res) {
    const payload = req.body;
    const id = req.params.id;

    ExperienceService.updateById(id, payload)
      .then(() => {
        return ResponseJSON.success(res, "update data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static deleteExperience(req, res) {
    const id = req.params.id;

    ExperienceService.delete(id)
      .then(() => {
        return ResponseJSON.success(res, "delete data successfully");
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  // projects
  static getProject(req, res) {
    const id = req.params.id;

    ProjectService.findById(id)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static getAllProject(req, res) {
    ProjectService.getAll()
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createProject(req, res) {
    const payload = req.body;

    ProjectService.create(payload)
      .then(() => {
        return ResponseJSON.success(res, "create data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static updateProject(req, res) {
    const id = req.params.id;
    const payload = req.body;

    ProjectService.update(id, payload)
      .then(() => {
        return ResponseJSON.success(res, "update data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static deleteProject(req, res) {
    const id = req.params.id;

    ProjectService.delete(id)
      .then(() => {
        return ResponseJSON.success(res, "delete data successfully");
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  // educations
  static getEducation(req, res) {
    const id = req.params.id;

    EducationService.findById(id)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static getAllEducation(req, res) {
    EducationService.getAll()
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createEducation(req, res) {
    const payload = req.body;

    EducationService.create(payload)
      .then(() => {
        return ResponseJSON.success(res, "create data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static updateEducation(req, res) {
    const id = req.params.id;
    const payload = req.body;

    EducationService.update(id, payload)
      .then(() => {
        return ResponseJSON.success(res, "update data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static deleteEducation(req, res) {
    const id = req.params.id;

    EducationService.delete(id)
      .then(() => {
        return ResponseJSON.success(res, "delete data successfully");
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  // certificates
  static getCertificate(req, res) {
    const id = req.params.id;

    CertificateService.findById(id)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static getAllCertificate(req, res) {
    CertificateService.getAll()
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createCertificate(req, res) {
    const payload = req.body;

    CertificateService.create(payload)
      .then(() => {
        return ResponseJSON.success(res, "create data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static updateCertificate(req, res) {
    const id = req.params.id;
    const payload = req.body;

    CertificateService.update(id, payload)
      .then(() => {
        return ResponseJSON.success(res, "update data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static deleteCertificate(req, res) {
    const id = req.params.id;

    CertificateService.delete(id)
      .then(() => {
        return ResponseJSON.success(res, "delete data successfully");
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  // contacts
  static getContact(req, res) {
    const id = req.params.id;

    ContactService.findById(id)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static getAllContact(req, res) {
    ContactService.getAll()
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createContact(req, res) {
    const payload = req.body;

    ContactService.create(payload)
      .then(() => {
        return ResponseJSON.success(res, "create data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static updateContact(req, res) {
    const id = req.params.id;
    const payload = req.body;

    ContactService.update(id, payload)
      .then(() => {
        return ResponseJSON.success(res, "update data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error", err);
      });
  }
  static deleteContact(req, res) {
    const id = req.params.id;

    ContactService.delete(id)
      .then(() => {
        return ResponseJSON.success(res, "delete data successfully");
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  // skills
  static getSkill(req, res) {
    const id = req.params.id;

    SkillService.findById(id)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static getAllSkill(req, res) {
    SkillService.getAll()
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createSkill(req, res) {
    const payload = req.body;

    SkillService.create(payload)
      .then(() => {
        return ResponseJSON.success(res, "create data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static updateSkill(req, res) {
    const id = req.params.id;
    const payload = req.body;

    SkillService.update(id, payload)
      .then(() => {
        return ResponseJSON.success(res, "update data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
  }
  static deleteSkill(req, res) {
    const id = req.params.id;

    SkillService.delete(id)
      .then(() => {
        return ResponseJSON.success(res, "delete data successfully");
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
}

export default MainController;
