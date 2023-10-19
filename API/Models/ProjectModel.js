import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";
import SkillModel from "./SkillModel.js";

const ProjectModel = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  documentation: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT("long"),
  },
});

ProjectModel.hasMany(SkillModel);

export default ProjectModel;
