import ProfileModel from "../Models/ProfileModel.js";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";

const password = bcrypt.hashSync("121212", 16);

const users = [
  {
    username: "arifinhabibi",
    password: password,
    fullname: "Muhammad Arifin Habibi",
  },
  {
    username: "user",
    password: password,
    fullname: "Alexander Pererro",
  },
];

const databaseSeeder = () => {
  // users
  users.forEach((user, index) => {
    UserModel.create(user).then((resp) => {
      ProfileModel.create({
        profileId: resp.dataValues.id,
        fullname: user.fullname,
      });
    });
  });
};

export default databaseSeeder;
