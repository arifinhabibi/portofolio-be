import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const CertificateModel = sequelize.define("Certificate", {
  title: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  file: {
    type: DataTypes.BLOB,
  },
  date: {
    type: DataTypes.DATE,
  },
});

export default CertificateModel;
