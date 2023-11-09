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
  address: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  language: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  summary: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  avatar: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default ProfileModel;
