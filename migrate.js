import {
  Blogs,
  Users,
} from './models/index.js';

async function main() {
  await Users.sync({alter: true, logging: true});
  await Blogs.sync({alter: true, logging: true});
  process.exit(0);
}

main().catch(console.error);
