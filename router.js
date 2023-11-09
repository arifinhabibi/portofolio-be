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

// main
router.get("/profile", Middlware.authJWT, MainController.getAllProfile);
router.post("/profile", Middlware.authJWT, MainController.createProfile);
router.get("/profile/:id", Middlware.authJWT, MainController.getProfile);
router.put("/profile/:id", Middlware.authJWT, MainController.updateProfile);
router.delete("/profile/:id", Middlware.authJWT, MainController.deleteProfile);

router.get("/project", Middlware.authJWT, MainController.getAllProject);
router.post("/project", Middlware.authJWT, MainController.createProject);
router.get("/project/:id", Middlware.authJWT, MainController.getProject);
router.put("/project/:id", MainController.updateProject);
router.delete("/project/:id", Middlware.authJWT, MainController.deleteProject);

router.get("/experience", Middlware.authJWT, MainController.getAllExperience);
router.post("/experience", Middlware.authJWT, MainController.createExperience);
router.get("/experience/:id", Middlware.authJWT, MainController.getExperience);
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

router.get("/education", Middlware.authJWT, MainController.getAllEducation);
router.post("/education", Middlware.authJWT, MainController.createEducation);
router.get("/education/:id", Middlware.authJWT, MainController.getEducation);
router.put("/education/:id", Middlware.authJWT, MainController.updateEducation);
router.delete(
  "/education/:id",
  Middlware.authJWT,
  MainController.deleteEducation
);

router.get("/certificate", Middlware.authJWT, MainController.getAllCertificate);
router.post(
  "/certificate",
  Middlware.authJWT,
  MainController.createCertificate
);
router.get(
  "/certificate/:id",
  Middlware.authJWT,
  MainController.getCertificate
);
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

router.get("/contact", Middlware.authJWT, MainController.getAllContact);
router.post("/contact", Middlware.authJWT, MainController.createContact);
router.get("/contact/:id", Middlware.authJWT, MainController.getContact);
router.put("/contact/:id", Middlware.authJWT, MainController.updateContact);
router.delete("/contact/:id", Middlware.authJWT, MainController.deleteContact);

router.get("/skill", Middlware.authJWT, MainController.getAllSkill);
router.post("/skill", Middlware.authJWT, MainController.createSkill);
router.get("/skill/:id", Middlware.authJWT, MainController.getSkill);
router.put("/skill/:id", Middlware.authJWT, MainController.updateSkill);
router.delete("/skill/:id", Middlware.authJWT, MainController.deleteSkill);

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