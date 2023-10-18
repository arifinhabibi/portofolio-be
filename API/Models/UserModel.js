import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";
import ProfileModel from "./ProfileModel.js";
import ExperienceModel from "./ExperienceModel.js";
import ProjectModel from "./ProjectModel.js";
import EducationModel from "./EducationModel.js";
import CertificateModel from "./CertificateModel.js";
import ContactModel from "./ContactModel.js";

const UserModel = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

UserModel.hasOne(ProfileModel);
UserModel.hasMany(ExperienceModel);
UserModel.hasMany(ProjectModel);
UserModel.hasMany(EducationModel);
UserModel.hasMany(CertificateModel);
UserModel.hasMany(ContactModel);

export default UserModel;
