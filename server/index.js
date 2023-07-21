const axios = require("axios");
const server = require("./src/app");
const { conn } = require("./src/db.js");
const loadDB = require("./loadDB");
const PORT = 3001;

conn
  .sync({ force: true })//eliminara y volvera a crear la informacion de la base de datos
  .then(async () => {
    //se hace el cargue de la base de datos
    await loadDB();

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));