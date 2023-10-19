import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const SkillModel = sequelize.define("Skill", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
});

export default SkillModel;
