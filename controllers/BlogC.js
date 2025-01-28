import {Blogs, Users} from "../models/index.js";

class BlogC {

  static async createBlog(req, res, next) {
    try {
      const {userId} = req.params;
      const {message} = req.body;
      const {file} = req;

      const mediaUrl = file.path;
      const newBlog = await Blogs.create({
        message,
        mediaPath: mediaUrl,
        userId,
      });

      res.json({
        status: "ok",
        newBlog,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }

  }

  static async getAllBlogList(req, res, next) {
    try {
      const blogs = await Blogs.findAll({
        include: [
          {
            model: Users,
            as: 'users',
            attributes: ['id', 'userName',],
          },
        ],
      });
      res.json({
        status: "ok",
        blogs,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }

  }

  static async getSingleBlogData(req, res, next) {
    try {
      const { blogId } = req.params;
      const blog = await Blogs.findByPk(blogId, {
        include: [
          {
            model: Users,
            as: 'users',
            attributes: ['id', 'userName',],
          },
        ],
      });
      res.json({
        status: "ok",
        blog,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }

  }

  static async editBlog(req, res, next) {
    try {
      const {userId, blogId} = req.params;
      const {message} = req.body;
      const {file} = req;

      const mediaUrl = file.path;

      const newBlog = await Blogs.findByPk(blogId);
      if (newBlog) {
        newBlog.message = message || newBlog.message;
        newBlog.mediaPath = mediaUrl || newBlog.mediaPath;
        newBlog.userId = userId;
      }

      const updatedBlog = await newBlog.save();
      res.json({
        status: "ok",
        updatedBlog,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }

  }

  static async deleteBlog(req, res, next) {
    try {
      const {blogId} = req.params;
      const blog = await Blogs.findByPk(blogId);

      if (!blog) {
        return res.status(404).json({message: 'Blog not found'});
      }

      await blog.destroy();
      res.json({
        message: 'Blog successfully deleted',
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

}

export default BlogC;
