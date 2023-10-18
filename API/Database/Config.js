import UserModel from "../Models/UserModel.js";
import sequelize from "./Connection.js";
import databaseSeeder from "./DatabaseSeeder.js";

// make table, please don't change rules
// 1. model user

new UserModel();

const configDatabase = (async () => {
  try {
    await sequelize.sync({ force: true });
    databaseSeeder();
    console.log("Tables has been created!");
  } catch (error) {
    console.log("Error creating tables:", error);
  }
})();

export default configDatabase;
