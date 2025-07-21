const categoriesList = document.getElementById("categories-list");

async function fetchCategories() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    const categories = await res.json();

    categories.forEach((category) => {
      const li = document.createElement("li");
      li.textContent = category.name;

      const img = document.createElement("img");
      img.src = category.image;
      img.alt = category.name;
      img.style.width = "170px";

      li.appendChild(img);
      categoriesList.appendChild(li);
    });
  } catch (error) {
    console.error("Ошибка при загрузке категорий:", error);
    categoriesList.innerHTML = "<li>Ошибка загрузки категорий </li>";
  }
}

fetchCategories();
