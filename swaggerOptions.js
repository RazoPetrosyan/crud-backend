import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API for Blog Application',
      version: '1.0.0',
      description: 'This is a simple API for blog posts, user registration, and login.',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
      },
    ],
  },
  apis: [path.join(__dirname, 'routers/*.js')],
};

export default swaggerOptions;
