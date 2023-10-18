import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const ContactModel = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});

export default ContactModel;
