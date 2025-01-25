import md5 from 'md5';
import HttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import {
  Users,
} from '../models/index.js';

const {
  USER_PASSWORD_HASH,
  USER_JWT_SECRET,
} = process.env;

class UserC {
  static async register(req, res, next) {
    try {
      const {
        userName,
        email,
        password,
        isAdmin,
      } = req.body;

      const errors = {};
      let existingUserByUserName;
      let existingUserByEmail;

      if (userName) {
        existingUserByUserName = await Users.findOne({where: {userName}});
      }

      if (email) {
        existingUserByEmail = await Users.findOne({where: {email}});
      }

      if (existingUserByUserName) {
        errors.userName = 'UserName already exists';
      }

      if (existingUserByEmail) {
        errors.email = 'Email already exists';
      }

      if (Object.keys(errors).length > 0) {
        throw HttpError(422, {errors});
      }

      const passwordHash = md5(md5(password) + USER_PASSWORD_HASH);

      const user = await Users.create({
        userName,
        email,
        password: passwordHash,
        isAdmin,
      });


      res.json({
        status: 'ok',
        user,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const {
        email,
        password,
      } = req.body;

      const user = await Users.findOne({
        where: {email},
        attributes: {
          exclude: ['password'],
        },
      });

      if (!user) {
        throw HttpError(404);
      }

      const fullUser = await Users.findByPk(user.id);

      const hashedPassword = md5(md5(password) + USER_PASSWORD_HASH);
      if (fullUser.password !== hashedPassword) {
        throw HttpError(422, 'Invalid Username or Password');
      }

      const token = jwt.sign({userId: user.id}, USER_JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  static async userData(req, res, next) {
    try {
      const token = Object.keys(req.body)[0];
      const decodedToken = jwt.verify(token, USER_JWT_SECRET);
      const { userId } = decodedToken;

      const user = await Users.findByPk(userId, {});

      if (!user) {
        throw new HttpError(404, 'User Not Found');
      }

      res.json({
        user,
      });
    } catch (e) {
      next(e);
    }
  }

}

export default UserC;
