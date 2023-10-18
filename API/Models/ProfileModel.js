import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const ProfileModel = sequelize.define("Profile", {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("owner", "user"),
    defaultValue: "user",
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default ProfileModel;
