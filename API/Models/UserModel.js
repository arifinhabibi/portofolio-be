import { Sequelize } from "sequelize";
import sequelize from "../Database/Connection.js";

const UserModel = sequelize.define('User', {
    fullname: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    }
})

export default UserModel