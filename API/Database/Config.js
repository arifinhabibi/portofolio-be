import CertificateModel from "../Models/CertificateModel.js";
import ContactModel from "../Models/ContactModel.js";
import EducationModel from "../Models/EducationModel.js";
import ExperienceModel from "../Models/ExperienceModel.js";
import ProfileModel from "../Models/ProfileModel.js";
import ProjectModel from "../Models/ProjectModel.js";
import SkillModel from "../Models/SkillModel.js";
import UserModel from "../Models/UserModel.js";
import sequelize from "./Connection.js";
import databaseSeeder from "./Seeder.js";

// make table, please don't change list rules
// 1. model user
// 2. model profile
// 3. model experience
// 4. model project
// 5. model skill
// 6. model education
// 7. model certificate
// 8. model contact

new UserModel();
new ProfileModel();
new ProjectModel();
new ExperienceModel();
new SkillModel();
new EducationModel();
new CertificateModel();
new ContactModel();

const configDatabase = (async () => {
  try {
    // register tables
    await sequelize.sync({ force: true });
    databaseSeeder();
    console.log("Tables has been created!");
  } catch (error) {
    console.log("Error creating tables:", error);
  }
})();

export default configDatabase;
