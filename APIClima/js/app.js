const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(event) {
  event.preventDefault();

  //Validar ciudad y país
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("ambos campos son obligatorios");

    return;
  }

  //Consultar API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const parrafoResultado = document.querySelector("#resultado p");
  parrafoResultado.id = "Presultado";
  parrafoResultado.classList.add("hidden");

  const divError = document.createElement("div");
  const parrafoDiv = document.createElement("p");
  parrafoDiv.id = "Perror";

  resultado.appendChild(divError);
  divError.appendChild(parrafoDiv);

  parrafoDiv.textContent = `${mensaje}`;
  parrafoDiv.classList.add(
    "bg-red-500",
    "text-white",
    "p-4",
    "text-center",
    "w-full"
  );

  setTimeout(() => {
    parrafoResultado.classList.remove("hidden");
    parrafoDiv.remove();
  }, 3000);
}

function consultarAPI(ciudad, pais) {
  const appID = "74f5f4b05ea19b8a5afa8b9e23e8648f";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      if ((datos.cod = "404")) {
        mostrarError("Ciudad no encontrada");
      }
    });
}
