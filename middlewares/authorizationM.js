import jwt from 'jsonwebtoken';
import HttpError from 'http-errors';

const EXCLUDE = [
  'POST:/user/register',
  'POST:/user/login',
  'GET:/blog/list',
];

const {USER_JWT_SECRET} = process.env;

function authorizationM(req, res, next) {
  try {
    const {method, path} = req;
    const authorization = req.headers.authorization || req.headers.Authorization;

    if (method === 'OPTIONS' || EXCLUDE.some((pattern) => (pattern instanceof RegExp ? pattern.test(`${method}:${path}`) : pattern === `${method}:${path}`))) {
      next();
      return;
    }

    if (!authorization) {
      throw HttpError(401, 'Authorization header missing');
    }

    const token = authorization.replace('Bearer ', '');

    if (!token) {
      throw HttpError(401, 'Token missing');
    }

    const decoded = jwt.verify(token, USER_JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.log(e, 'error');
    next(e);
  }
}

export default authorizationM;
