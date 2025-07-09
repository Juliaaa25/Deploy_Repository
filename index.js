const Promise1 = new Promise((resolve, reject) => {
  const success = Math.random() < 0.5;

  if (success) {
    resolve("Best day of my life");
  } else {
    reject("Something is off");
  }
});

Promise1.then((message) => {
  console.log("Успех:", message);
}).catch((error) => {
  console.error("Ошибка:", error);
});
