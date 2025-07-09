const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() < 0.5;

  if (success) {
    resolve("Best day of my life");
  } else {
    reject("Something is off");
  }
});

myPromise
  .then((message) => {
    console.log("Успех:", message);
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });
