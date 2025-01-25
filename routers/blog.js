import { Router } from 'express';
import upload from "../middlewares/multerM.js";
import BlogC from "../controllers/BlogC.js";

const router = Router();

/**
 * @swagger
 * /api/blog/create/{userId}:
 *   post:
 *     summary: Create a new blog post
 *     description: Creates a new blog post with optional media file (image or video).
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID of the person creating the blog post.
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: This is a new blog post.
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Invalid input or file
 */
router.post('/create/:userId', upload.single('file'), BlogC.createBlog);

/**
 * @swagger
 * /api/blog/list:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieves a list of all blog posts.
 *     responses:
 *       200:
 *         description: Successfully retrieved blog posts
 */
router.get('/list', BlogC.getAllBlogList);

/**
 * @swagger
 * /api/blog/single/{blogId}:
 *   get:
 *     summary: Get a single blog post
 *     description: Retrieves a single blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post.
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the blog post
 *       404:
 *         description: Blog post not found
 */
router.get('/single/:blogId', BlogC.getSingleBlogData);

/**
 * @swagger
 * /api/blog/delete/{blogId}:
 *   put:
 *     summary: Delete a blog post
 *     description: Deletes a blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post to delete.
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the blog post
 *       404:
 *         description: Blog post not found
 */
router.put('/delete/:blogId', BlogC.deleteBlog);

/**
 * @swagger
 * /api/blog/update/{userId}/{blogId}:
 *   put:
 *     summary: Update an existing blog post
 *     description: Updates the content of an existing blog post. Allows media file upload.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID of the person updating the blog post.
 *         schema:
 *           type: string
 *           example: 1
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post to update.
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Updated blog post content.
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       400:
 *         description: Invalid input or file
 *       404:
 *         description: Blog post not found
 */
router.put('/update/:userId/:blogId', upload.single('file'), BlogC.editBlog);

export default router;
