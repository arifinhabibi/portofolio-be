import ProfileModel from "../Models/ProfileModel.js";
import UserModel from "../Models/UserModel.js";
import crypto from "crypto";

const md5 = crypto.createHash("md5");
md5.update("121212");
const password = md5.digest("hex");

const users = [
  {
    username: "arifinhabibi",
    password: password,
  },
  {
    username: "user",
    password: password,
  },
];

const databaseSeeder = () => {
  // users
  users.forEach((user, index) => {
    var createUser = UserModel.create(user);
    createUser.then((resp) => {
      ProfileModel.create({
        UserId: resp.dataValues.id,
        fullname: "Muhammad Arifin Habibi",
      });
    });
  });
};

export default databaseSeeder;
