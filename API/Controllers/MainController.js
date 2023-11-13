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
    const userId = req.query.userId;

    ExperienceService.getAll(userId)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createExperience(req, res) {
    const payload = req.body;
    const userInfo = req.userInfo;

    payload.UserId = userInfo.userId;

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
    const userInfo = req.userInfo;

    ExperienceService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded!")  
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user!");
      }

      ExperienceService.update(id, payload)
      .then(() => {
        return ResponseJSON.success(res, "update data successfully");
      })
      .catch((err) => {
        return ResponseJSON.badRequest(res, "error!", err);
      });
    })

   
  }
  static deleteExperience(req, res) {
    const id = req.params.id;
    const userInfo = req.userInfo;

    ExperienceService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded!");
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user!");
      }

      ExperienceService.delete(id)
        .then(() => {
          return ResponseJSON.success(res, "delete data successfully");
        })
        .catch(() => {
          return ResponseJSON.notFound(res, "data not founded!");
        });
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
    const userId = req.query.userId;
    ProjectService.getAll(userId)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createProject(req, res) {
    const payload = req.body;
    const userInfo = req.userInfo

    payload.UserId = userInfo.userId

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
    const userInfo = req.userInfo;


    ProjectService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded");
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user!");
      }

      ProjectService.update(id, payload)
        .then(() => {
          return ResponseJSON.success(res, "update data successfully");
        })
        .catch((err) => {
          return ResponseJSON.badRequest(res, "error!", err);
        });
    });
    
  }
  static deleteProject(req, res) {
    const id = req.params.id;
    const userInfo = req.userInfo;

    ProjectService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded");
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user!");
      }

      ProjectService.delete(id)
        .then(() => {
          return ResponseJSON.success(res, "delete data successfully");
        })
        .catch(() => {
          return ResponseJSON.notFound(res, "data not founded!");
        });
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
    const userId = req.query.userId;

    EducationService.getAll(userId)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createEducation(req, res) {
    const payload = req.body;
    const userInfo = req.userInfo

    payload.UserId = userInfo.userId

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
    const userInfo = req.userInfo
    
    EducationService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded!");
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user!");
      }

      EducationService.update(id, payload)
        .then(() => {
          return ResponseJSON.success(res, "update data successfully");
        })
        .catch((err) => {
          return ResponseJSON.badRequest(res, "error!", err);
        });
    });
  }
  static deleteEducation(req, res) {
    const id = req.params.id;
    const userInfo = req.userInfo;

    EducationService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded!");
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user");
      }

      EducationService.delete(id)
        .then(() => {
          return ResponseJSON.success(res, "delete data successfully");
        })
        .catch(() => {
          return ResponseJSON.notFound(res, "data not founded!");
        });
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
    const userId = req.query.userId;

    CertificateService.getAll(userId)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createCertificate(req, res) {
    const payload = req.body;
    const userInfo = req.userInfo

    payload.UserId = userInfo.userId

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
    const userInfo = req.userInfo;

    CertificateService.findById(id).then(
      data => {
        if (data == null) {
          return ResponseJSON.notFound(res, "data not founded!")
        }

        if (data.dataValues.UserId != userInfo.userId) {
          return ResponseJSON.unauthorized(res, "unauthorized user!")
        }

        CertificateService.update(id, payload)
          .then(() => {
            return ResponseJSON.success(res, "update data successfully");
          })
          .catch((err) => {
            return ResponseJSON.badRequest(res, "error!", err);
          });
      }
    )

 
  }
  static deleteCertificate(req, res) {
    const id = req.params.id;
    const userInfo = req.userInfo;

    CertificateService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded!");
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user!");
      }

      CertificateService.delete(id)
        .then(() => {
          return ResponseJSON.success(res, "delete data successfully");
        })
        .catch(() => {
          return ResponseJSON.notFound(res, "data not founded!");
        });
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
    const userId = req.query.userId;

    ContactService.getAll(userId)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createContact(req, res) {
    const payload = req.body;
    const userInfo = req.userInfo;

    payload.UserId = userInfo.userId

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
    const userInfo = req.userInfo;


    ContactService.findById(id).then(
      data => {
        if (data == null) {
          return ResponseJSON.notFound(res, "data not founded!")
        }

        if (data.dataValues.UserId != userInfo.userId) {
          return ResponseJSON.unauthorized(res, "unauthorized user")
        }

        ContactService.update(id, payload)
          .then(() => {
            return ResponseJSON.success(res, "update data successfully");
          })
          .catch((err) => {
            return ResponseJSON.badRequest(res, "error", err);
          });
      }
    )

    
  }
  static deleteContact(req, res) {
    const id = req.params.id;
    const userInfo = req.userInfo;

    ContactService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded!");
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user");
      }

      ContactService.delete(id)
        .then(() => {
          return ResponseJSON.success(res, "delete data successfully");
        })
        .catch(() => {
          return ResponseJSON.notFound(res, "data not founded!");
        });
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
    const userId = req.query.userId;

    SkillService.getAll(userId)
      .then((data) => {
        return ResponseJSON.successWithData(res, "data has been loaded!", data);
      })
      .catch(() => {
        return ResponseJSON.notFound(res, "data not founded!");
      });
  }
  static createSkill(req, res) {
    const payload = req.body;

    payload.UserId = req.userInfo.userId

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
    const userInfo = req.userInfo;

    SkillService.findById(id).then(
      data => {
        if (data == null) {
          return ResponseJSON.notFound(res, "data not founded!")
        }

        if (data.dataValues.UserId != userInfo.userId) {
          return ResponseJSON.unauthorized(res, "unauthorized user!")
        }

        SkillService.update(id, payload)
          .then(() => {
            return ResponseJSON.success(res, "update data successfully");
          })
          .catch((err) => {
            return ResponseJSON.badRequest(res, "error!", err);
          });
      }
    )
    
  }
  static deleteSkill(req, res) {
    const id = req.params.id;
    const userInfo = req.userInfo;

    SkillService.findById(id).then((data) => {
      if (data == null) {
        return ResponseJSON.notFound(res, "data not founded!");
      }

      if (data.dataValues.UserId != userInfo.userId) {
        return ResponseJSON.unauthorized(res, "unauthorized user!");
      }

      SkillService.delete(id)
        .then(() => {
          return ResponseJSON.success(res, "delete data successfully");
        })
        .catch(() => {
          return ResponseJSON.notFound(res, "data not founded!");
        });
    });

  }
}

export default MainController;
