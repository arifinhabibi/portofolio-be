import { configDotenv } from 'dotenv'
import express from 'express'
import AuthController from './API/Controllers/AuthController.js'
import Middlware from "./API/Middleware/Middleware.js";
import MainController from "./API/Controllers/MainController.js";
import fs from "fs";
import ResponseJSON from "./API/Helpers/ResponseJSON.js";

const router = express.Router();
configDotenv();

// write here your routes

// authentication
router.post("/auth/login", AuthController.login);
router.get("/auth/logout", Middlware.authJWT, AuthController.logout);
router.post(
  "/auth/change-password",
  Middlware.authJWT,
  AuthController.changePassword
);


// profiles
router.get("/profile", MainController.getAllProfile);
router.post("/profile", MainController.createProfile);
router.get("/profile/:userId", MainController.getProfile);
router.put("/profile/:userId", Middlware.authJWT, MainController.updateProfile);


// project
router.get("/project", MainController.getAllProject);
router.post("/project", Middlware.authJWT, MainController.createProject);
router.get("/project/:id", MainController.getProject);
router.put("/project/:id", Middlware.authJWT, MainController.updateProject);
router.delete("/project/:id", Middlware.authJWT, MainController.deleteProject);


// experiences
router.get("/experience", MainController.getAllExperience);
router.post("/experience", Middlware.authJWT, MainController.createExperience);
router.get("/experience/:id", MainController.getExperience);
router.put(
  "/experience/:id",
  Middlware.authJWT,
  MainController.updateExperience
);
router.delete(
  "/experience/:id",
  Middlware.authJWT,
  MainController.deleteExperience
);


// education
router.get("/education", MainController.getAllEducation);
router.post("/education", Middlware.authJWT, MainController.createEducation);
router.get("/education/:id", MainController.getEducation);
router.put("/education/:id", Middlware.authJWT, MainController.updateEducation);
router.delete(
  "/education/:id",
  Middlware.authJWT,
  MainController.deleteEducation
);


// certificates
router.get("/certificate", MainController.getAllCertificate);
router.post(
  "/certificate",
  Middlware.authJWT,
  MainController.createCertificate
);
router.get("/certificate/:id", MainController.getCertificate);
router.put(
  "/certificate/:id",
  Middlware.authJWT,
  MainController.updateCertificate
);
router.delete(
  "/certificate/:id",
  Middlware.authJWT,
  MainController.deleteCertificate
);


// contacts
router.get("/contact", MainController.getAllContact);
router.post("/contact", Middlware.authJWT, MainController.createContact);
router.get("/contact/:id", MainController.getContact);
router.put("/contact/:id", Middlware.authJWT, MainController.updateContact);
router.delete("/contact/:id", Middlware.authJWT, MainController.deleteContact);


// skills
router.get("/skill", MainController.getAllSkill);
router.post("/skill", Middlware.authJWT, MainController.createSkill);
router.get("/skill/:id", MainController.getSkill);
router.put("/skill/:id", Middlware.authJWT, MainController.updateSkill);
router.delete("/skill/:id", Middlware.authJWT, MainController.deleteSkill);


// route for download file resume
router.get("/download/resume/:file", (req, res) => {
  const file = req.params.file;

  fs.readFile(`public/documents/${file}`, (err, data) => {
    if (err) {
      return ResponseJSON.notFound(res, "error!");
    } else {
      return ResponseJSON.successWithData(res, "data has been loaded!", data);
    }
  });
});

export default router;