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
      console.log(datos);
      //LimpiarHTML
      limpiarHTML();

      if (datos.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }

      //Imprimir la respuesta en el HTML
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = kelvinACentigrados(temp);
  const centigradosMax = kelvinACentigrados(temp_max);
  const centigradosMin = kelvinACentigrados(temp_min);
  const tempActual = document.createElement("p");

  const ciudad = document.createElement("p");
  ciudad.innerHTML = `Clima en ${name}`;
  ciudad.classList.add("text-white", "text-2xl");

  tempActual.innerHTML = `${centigrados} &#8451`;
  tempActual.classList.add("font-bold", "text-6xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(ciudad);
  resultadoDiv.appendChild(tempActual);
  resultado.appendChild(resultadoDiv);

  const tempMin = document.createElement("p");
  tempMin.innerHTML = `Min: ${centigradosMin} &#8451`;
  tempMin.classList.add("text-xl");

  const tempMax = document.createElement("p");
  tempMax.innerHTML = `Max: ${centigradosMax} &#8451`;
  tempMax.classList.add("text-xl");

  const divTempMin = document.createElement("div");
  divTempMin.classList.add(
    "text-start",
    "text-white",
    "flex",
    "justify-around"
  );

  divTempMin.appendChild(tempMin);
  divTempMin.appendChild(tempMax);
  resultado.appendChild(divTempMin);
}

function kelvinACentigrados(grados) {
  return parseInt(grados - 273.15);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
