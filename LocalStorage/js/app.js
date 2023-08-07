// Varibles
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners() {
  //Cuando el usuario agrega un nuevo Tweet
  formulario.addEventListener("submit", agregarTweet);

  //Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearHTML();
  });
}

//Funciones
function agregarTweet(e) {
  e.preventDefault();

  //Text area donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;

  // validación
  if (tweet === "") {
    mostrarError("un mensaje no puede ir vacio");

    return; //evita que se ejecuten más líneas de código
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  //Añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];

  //Una vez agregados vamos a crear el HTML
  crearHTML();

  //Reiniciar el formulario
  formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //Insertarlo en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  //Elimina la alerta después de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

//Muestra un listado de tweets
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Agregar botón de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      //Añadir la función de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };
      //crear html
      const li = document.createElement("li");

      //añadir texto
      li.innerText = tweet.tweet;

      //Asignar el botón
      li.appendChild(btnEliminar);

      //Insertar en el HTML
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Agregar los Tweets actuales a LocalStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}

//Limpiar HTML
function limpiarHTML() {
  while (listaTweets.firstChild)
    listaTweets.removeChild(listaTweets.firstChild);
}
