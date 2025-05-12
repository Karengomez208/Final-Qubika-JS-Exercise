const { db } = require("./Firebase");
const { collection, getDocs, query } = require("firebase/firestore");

async function mostrarFavoritos() {
  try {
    const favoritosRef = collection(db, "favoritos");
    const q = query(favoritosRef);
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("you have no favorite movies saved.");
      return;
    }

    console.log("\nyour favorite movies:");
    let index = 1;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(
        `${index}. ${data.title || "Title not available"}.(${data.id}).(${
          data.vote_average
        })`
      );
      index++;
    });
  } catch (error) {
    console.error(" Error when consulting favorites:", error);
  }
}

module.exports = { mostrarFavoritos };
