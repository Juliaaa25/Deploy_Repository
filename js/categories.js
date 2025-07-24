const categoriesList = document.getElementById("categories");
const addForm = document.getElementById("add-category-form");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  if (!res.ok) {
    throw Error("Failed to fetch categories");
  }
  const categories = await res.json();
  categoriesList.innerHTML = ""; // очищаем перед повторной отрисовкой

  categories.forEach((category) => renderCategory(category));
}

function renderCategory(category) {
  const { id, image, name } = category;
  const categoryItem = document.createElement("li");
  const img = document.createElement("img");
  img.src = image;

  const p = document.createElement("p");
  p.textContent = name;

  categoryItem.append(p, img);
  categoryItem.classList.add("category-item");

  // Edit form
  const form = document.createElement("form");
  form.style.display = "none";
  form.innerHTML = `
    <input type="text" name="name" placeholder="name" value="${name}" />
    <input type="text" name="image" placeholder="image" value="${image}" />
    <button type="submit">Save</button>
  `;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.type = "button";
  editBtn.onclick = () => {
    form.style.display = form.style.display === "block" ? "none" : "block";
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.type = "button";
  deleteBtn.style.marginTop = "10px";
  deleteBtn.style.backgroundColor = "crimson";
  deleteBtn.style.color = "white";
  deleteBtn.onclick = () => fetchDeleteCategory(id, categoryItem);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchUpdateCategory(
      id,
      event.target.name.value,
      event.target.image.value,
      categoryItem
    );
  });

  categoryItem.append(editBtn, form, deleteBtn);
  categoriesList.append(categoryItem);
}

fetchCategories();

async function fetchUpdateCategory(id, name, image, categoryItem) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, image }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    categoryItem.firstChild.textContent = name;
    categoryItem.getElementsByTagName("img")[0].src = image;
  }
}

async function fetchDeleteCategory(id, categoryElement) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    categoryElement.remove();
  } else {
    alert("Ошибка при удалении категории");
  }
}

if (addForm) {
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newCategory = {
      name: e.target.name.value,
      image: e.target.image.value,
    };

    const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    if (res.ok) {
      const newCat = await res.json();
      renderCategory(newCat);
      e.target.reset();
    } else {
      const err = await res.json();
      alert(err.message || "Ошибка при добавлении");
    }
  });
}
