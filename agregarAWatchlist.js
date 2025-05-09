const fs = require("fs"); //módulo de Node.js para manejar archivos
const path = require("path"); //para construir rutas seguras independientemente del sistema operativo.

const rutaWatchlist = path.join(__dirname, "watchlist.txt"); //crea una ruta completa del archivo de texto

function agregarAWatchlist(pelicula) {
  return new Promise((resolve, reject) => {
    const id = pelicula.id.toString();

    fs.readFile(rutaWatchlist, "utf8", (err, data) => {
      if (err && err.code !== "ENOENT") {
        return reject(err);
      }

      const ids = data ? data.split("\n").filter(Boolean) : [];

      if (ids.includes(id)) {
        console.log("The movie is already on the watchlist.");
        return resolve();
      }

      ids.push(id);
      fs.writeFile(rutaWatchlist, ids.join("\n"), (err) => {
        if (err) return reject(err);
        console.log("Movie added to watchlist.");
        resolve();
      });
    });
  });
}
module.exports = { agregarAWatchlist };
