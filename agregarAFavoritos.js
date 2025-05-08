const { db } = require("./Firebase");
const {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} = require("firebase/firestore");

async function agregarAFavoritos(pelicula) {
  if (!pelicula || !pelicula.id) {
    console.log("Película inválida.");
    return;
  }

  const favoritosRef = collection(db, "favoritos");

  try {
    const q = query(favoritosRef, where("id", "==", pelicula.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log(`The  Movie "${pelicula.title}" it's already in favorites.`);
      return;
    }

    await addDoc(favoritosRef, {
      id: pelicula.id,
      title: pelicula.title,
      release_date: pelicula.release_date,
      vote_average: pelicula.vote_average,
      original_language: pelicula.original_language,
    });

    console.log(`Movie "${pelicula.title}"added to favorites.`);
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
}

module.exports = { agregarAFavoritos };
