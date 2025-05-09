const fs = require("fs");
const path = require("path");
const rutaWatchlist = path.join(__dirname, "watchlist.txt");

async function mostrarWatchlist() {
  const API_KEY = "683866e598b674531d5201f823cf467f";
  try {
    if (!fs.existsSync(rutaWatchlist)) {
      console.log("No watchlist saved.");
      return;
    }

    const data = fs.readFileSync(rutaWatchlist, "utf8");
    const ids = data.split("\n").filter(Boolean);

    if (ids.length === 0) {
      console.log("The watchlist is empty.");
      return;
    }

    console.log("\nMovies on the Watchlist:");
    for (const id of ids) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const pelicula = await res.json();
      console.log(`- ${pelicula.title} (${pelicula.release_date})`);
    }
  } catch (err) {
    console.error("Error reading watchlist:", err);
  }
}
module.exports = { mostrarWatchlist };
