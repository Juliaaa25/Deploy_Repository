// найдем первую кнопку по id
const btn = document.getElementById("magic-btn");
// скопируем ее - получилась вторая кнопка. Ее можно использовать.
const clonedBtn = btn.cloneNode(true);
// задали id
clonedBtn.id = "magic-btn-2";

// при нажатии на первую кнопку меняем текст
btn.addEventListener("click", () => {
  clonedBtn.textContent = "Я изменю тебя";

  // поменяем стили кнопки
  clonedBtn.style.backgroundColor = "#a78b71";
  clonedBtn.style.color = "white";

  // добавляем новый класс и кнопку в body
  clonedBtn.classList.add("second-btn");
  document.body.appendChild(clonedBtn);
});

clonedBtn.addEventListener("click", () => {
  // меняем стили первой кнопки
  btn.style.backgroundColor = "#9c4a1a";
  btn.style.color = "black";
});
