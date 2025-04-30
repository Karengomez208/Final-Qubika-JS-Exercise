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
        console.log("Performing Action 1...");
        break;
      case "2":
        console.log("Performing Action 2...");
        break;
      case "3":
        console.log("Performing Action 3...");
        break;
      case "4":
        console.log("Performing Action 4...");
        break;
      case "5":
        console.log("Performing Action 5...");
        break;
      case "6":
        console.log("Performing Action 6...");
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
