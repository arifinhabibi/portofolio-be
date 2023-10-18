import { configDotenv } from 'dotenv'
import express from 'express'
import AuthController from './API/Controllers/AuthController.js'

const router = express.Router()
configDotenv()

// write here your routes


// authentication
router.post('/auth/login', AuthController.login)

export default router