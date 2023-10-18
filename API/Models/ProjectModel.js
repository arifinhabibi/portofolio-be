import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const ProjectModel = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
  },
});

export default ProjectModel;
