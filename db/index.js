const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    ssl: true,
    logging: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  }
);



sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch(err => {
  console.log("Unable to connect to the database:", err);
});

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = sequelize
