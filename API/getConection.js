const getConection = (mysql) => {
  return mysql.createConnection({
    host: "database-1.czklrrr38xte.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "basededatos",
    database: "recipy",
  });
};

module.exports = getConection;
