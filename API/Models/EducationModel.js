import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const EducationModel = sequelize.define("Educations", {
  instance: {
    type: DataTypes.STRING,
  },
  bachelor: {
    type: DataTypes.STRING,
  },
  start_time: {
    type: DataTypes.DATE,
  },
  finish_time: {
    type: DataTypes.DATE,
  },
  description: {
    type: DataTypes.TEXT("long"),
  },
});

export default EducationModel;
