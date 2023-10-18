import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";

configDotenv()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION
})

sequelize.authenticate().then(
    () => {
        console.log("Database success connected!")
    }
).catch(
    err => {
        console.log(err)
    }
)

export default sequelize