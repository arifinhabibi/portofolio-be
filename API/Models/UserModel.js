import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";
import ProfileModel from "./ProfileModel.js";
import ExperienceModel from "./ExperienceModel.js";
import ProjectModel from "./ProjectModel.js";
import EducationModel from "./EducationModel.js";
import CertificateModel from "./CertificateModel.js";
import ContactModel from "./ContactModel.js";
import SkillModel from "./SkillModel.js";
import generateOTPCode from "../Helpers/GenerateOTPCode.js";

// table schema
const UserModel = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM("owner", "user"),
    defaultValue: "user",
  },
  active_until: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  otp_code: {
    type: DataTypes.INTEGER,
    defaultValue: generateOTPCode(4),
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// relational database
UserModel.hasOne(ProfileModel, { as: "profile" });
UserModel.hasMany(ExperienceModel, { as: "experience" });
UserModel.hasMany(ProjectModel, { as: "project" });
UserModel.hasMany(SkillModel, { as: "skill" });
UserModel.hasMany(EducationModel, { as: "education" });
UserModel.hasMany(CertificateModel, { as: "certificate" });
UserModel.hasMany(ContactModel, { as: "contact" });

export default UserModel;
