import { DataTypes } from "sequelize";
import sequelize from "../Database/Connection.js";

const CertificateModel = sequelize.define("Certificate", {
  title: {
    type: DataTypes.STRING,
  },
});

export default CertificateModel;
