import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const ExperienceModel = sequelize.define("Experience", {
  location: {
    type: DataTypes.STRING,
  },
});

export default ExperienceModel;
