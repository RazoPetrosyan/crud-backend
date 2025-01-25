import { Sequelize } from 'sequelize';
import cls from 'cls-hooked';

const {
  MYSQLHOST, MYSQLPORT, MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD,
} = process.env;

const namespace = cls.createNamespace('sequelize-transaction-namespace');

Sequelize.useCLS(namespace);

const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
  dialect: 'mysql',
  host: MYSQLHOST,
  port: MYSQLPORT,
  logging: false,
});

export default sequelize;
