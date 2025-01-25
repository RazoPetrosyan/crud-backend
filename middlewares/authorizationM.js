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
    const { method, path } = req;
    const { authorization = '' } = req.headers;

    if (method === 'OPTIONS' || EXCLUDE.includes(`${method}:${path}`)) {
      next();
      return;
    }

    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw HttpError(401, 'Authorization token is missing');
    }

    const decoded = jwt.verify(token, USER_JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      return next(HttpError(401, 'Invalid or expired token'));
    }
    next(e);
  }
}

export default authorizationM;
