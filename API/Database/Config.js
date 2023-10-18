import UserModel from "../Models/UserModel.js";
import sequelize from "./Connection.js";

// make table, please don't change rules
// 1. model user

new UserModel();

const configDatabase = sequelize
  .sync()
  .then(() => {
    console.log("Tables has been created!");
  })
  .catch((err) => {
    console.log("Error creating table:", err);
  });

export default configDatabase;
