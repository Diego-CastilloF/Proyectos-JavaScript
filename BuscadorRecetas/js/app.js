function iniciarApp() {
  const selectCategorias = document.querySelector("#categorias");

  obtenerCategorias();

  function obtenerCategorias() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

    fetch(url)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((resultado) => {
        mostrarCategorias(resultado.categories);
      });
  }

  function mostrarCategorias(categorias = []) {
    categorias.forEach((categoria) => {
      const { strCategory } = categoria;
      const option = document.createElement("OPTION");
      const categoryoption = (option.value = strCategory);
      option.textContent = categoryoption;

      selectCategorias.appendChild(option);

      console.log(option);
    });
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp);
