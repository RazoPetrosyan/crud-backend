import { Router } from 'express';
import UserC from '../controllers/UserC.js';
import validateM from "../middlewares/validateM.js";
import schema from "../schemas/schema.js";

const router = Router();

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               userName:
 *                 type: string
 *                 example: TestUser1
 *               password:
 *                 type: string
 *                 example: Password123_
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/register', validateM(schema.createUser), UserC.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user by verifying email and password and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123_
 *     responses:
 *       200:
 *         description: User logged in successfully, returns JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', validateM(schema.login), UserC.login);

/**
 * @swagger
 * /api/user/single:
 *   post:
 *     summary: Get user data
 *     description: Retrieves user data based on the provided JWT token.
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *       401:
 *         description: Unauthorized access, invalid or missing JWT token
 */
router.post('/single', UserC.userData);

export default router;
