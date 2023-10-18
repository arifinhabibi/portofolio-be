import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const EducationModel = sequelize.define("Educations", {
  name: {
    type: DataTypes.STRING,
  },
});

export default EducationModel;
