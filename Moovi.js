const { agregarAFavoritos } = require("./agregarAFavoritos.js");
const { agregarAWatchlist } = require("./agregarAWatchlist.js");
const { mostrarWatchlist } = require("./mostrarWatchlist.js");
const { mostrarFavoritos } = require("./mostrarFavoritos");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function questionAsync(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log("Welcome to moovi!");
  let peliculasDisponibles = [];
  let option = "";
  while (option !== "7") {
    console.log("\nPlease select an option:");
    console.log("1. Show the currently playing movies");
    console.log("2. Show more details of a movie");
    console.log("3. Add one movie to favorites");
    console.log("4. Add one movie to watchlist");
    console.log("5. Log saved favorites movies");
    console.log("6. Log watchlist movies");
    console.log("7. Exit");

    option = await questionAsync("Enter your choice: ");

    switch (option) {
      case "1":
        const API_KEY = "683866e598b674531d5201f823cf467f";
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
          );
          const data = await response.json();
          peliculasDisponibles = data.results.slice(0, 20);
          console.log("Currently playing movies:");
          peliculasDisponibles.forEach((movie, index) => {
            console.log(
              `${index + 1}. ${movie.title} - Rating: ${
                movie.vote_average
              } - Language: ${movie.original_language}`
            );
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        break;
      case "2":
        if (peliculasDisponibles.length === 0) {
          console.log("No movies available. Please select option 1 first.");
          break;
        }

        console.log("Select a movie to view details:");
        peliculasDisponibles.forEach((movie, index) => {
          console.log(`${index + 1}. ${movie.title}`);
        });

        let numero = await questionAsync("Enter the movie number: ");
        numero = parseInt(numero);

        if (numero < 1 || numero > peliculasDisponibles.length) {
          console.log("Invalid movie number.");
          break;
        }

        const peliculaId = peliculasDisponibles[numero - 1].id;

        async function obtenerDetallesPelicula(peliculaId) {
          const API_KEY = "683866e598b674531d5201f823cf467f";
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${API_KEY}&language=en-US`
            );

            const detalles = await response.json();
            //console.log(detalles);
            console.log("\nMovie Details");
            console.log("────────────────────────────────────");
            console.log(`Title: ${detalles.title || "N/A"}`);
            console.log(
              `Original Language: ${detalles.original_language || "N/A"}`
            );
            console.log(`Original Title: ${detalles.original_title || "N/A"}`);
            console.log(`Release Date: ${detalles.release_date || "N/A"}`);
            console.log(`Popularity: ${detalles.popularity || "N/A"}`);
            console.log(`Vote Average: ${detalles.vote_average || "N/A"}`);
            console.log(`Vote Count: ${detalles.vote_count || "N/A"}`);
            console.log("\nOverview:");
            console.log(detalles.overview || "No overview available.");
            console.log("────────────────────────────────────\n");
          } catch (error) {
            console.error("Error al obtener detalles:", error);
          }
        }
        await obtenerDetallesPelicula(peliculaId);
        break;
      case "3":
        if (peliculasDisponibles.length === 0) {
          console.log("No movies available. Please select option 1 first.");
          break;
        }

        console.log("Select a movie to add to favorites:");
        peliculasDisponibles.forEach((movie, index) => {
          console.log(`${index + 1}. ${movie.title}`);
        });

        let seleccion = await questionAsync("Enter the movie number: ");
        seleccion = parseInt(seleccion);

        if (seleccion < 1 || seleccion > peliculasDisponibles.length) {
          console.log("Invalid selection.");
          break;
        }

        const peliculaSeleccionada = peliculasDisponibles[seleccion - 1];
        await agregarAFavoritos(peliculaSeleccionada);
        break;
      case "4":
        if (peliculasDisponibles.length === 0) {
          console.log("No movies available. Please select option 1 first.");
          break;
        }

        console.log("Select a movie to add to the watchlist:");
        peliculasDisponibles.forEach((movie, index) => {
          console.log(`${index + 1}. ${movie.title}`);
        });

        let seleccionWatchlist = await questionAsync(
          "Enter the movie number: "
        );
        seleccionWatchlist = parseInt(seleccionWatchlist);

        if (
          seleccionWatchlist < 1 ||
          seleccionWatchlist > peliculasDisponibles.length
        ) {
          console.log("Invalid selection.");
          break;
        }

        const peliculaAWL = peliculasDisponibles[seleccionWatchlist - 1];

        await agregarAWatchlist(peliculaAWL);

        break;

      case "5":
        await mostrarFavoritos();
        break;
      case "6":
        await mostrarWatchlist();
        break;
      case "7":
        console.log("Exiting program...");
        break;
      default:
        console.log("Invalid option. Please try again.");
    }
  }

  rl.close();
}
main();
