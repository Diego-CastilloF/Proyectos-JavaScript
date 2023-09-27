import { eliminarCita, cargarEdicion } from "../funciones.js";
import { contenedorCitas } from "../selectores.js";

class UI {
  imprimirAlerta(mensaje, tipo) {
    //Crear el div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    //Agregar clase en base al tipo de error
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    //Mensaje de error
    divMensaje.textContent = mensaje;

    //Añadir al DOOM
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    //Remover el mensaje después de 3 segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  imprimirCitas({ citas }) {
    this.limpiarHTML();

    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      //Creación del div
      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      //Scripting de los elemenos de la cita
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      //Creando propietario
      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

      //Creando Telefono
      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`;

      //Creando fecha
      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

      //Creando fecha
      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

      //Creando fecha
      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

      //Boton para eliminar citas
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML = "Eliminar";
      btnEliminar.onclick = () => eliminarCita(id);

      //Btn para editar una cita
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML = "Editar";
      btnEditar.onclick = () => cargarEdicion(cita);

      //Agregar los párrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      //Agregar las citas al HTML
      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

export default UI;
