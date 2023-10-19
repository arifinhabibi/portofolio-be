import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";
import ProjectModel from "./ProjectModel.js";

const ExperienceModel = sequelize.define("Experience", {
  location: {
    type: DataTypes.STRING,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  finish_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  documentation: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

ExperienceModel.hasMany(ProjectModel);

export default ExperienceModel;
