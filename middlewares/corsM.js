export const ALLOW_ORIGINS = [
  'http://localhost:3000',
];

export default function corsM(req, res, next) {
  try {
    const {origin} = req.headers;

    if (ALLOW_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,Accept,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    next();
  } catch (e) {
    next(e);
  }
}
