import ProfileModel from "../Models/ProfileModel.js";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";

const password = bcrypt.hashSync("121212", 16);

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
        profileId: resp.dataValues.id,
        fullname: "Muhammad Arifin Habibi",
      });
    });
  });
};

export default databaseSeeder;
