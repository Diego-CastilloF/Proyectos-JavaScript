import Citas from "./classes/Citas.js";
import UI from "./classes/UI.JS";

import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomasInput,
  formulario,
} from "./selectores.js";

const ui = new UI();
const administrarCitas = new Citas();

let editando;

//OBJETO CON LA INFORMACIÓN DE LA CITA
export const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//AGREGA DATOS AL OBJETO DE LA CITA
export function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

//VALIDA Y AGREGA UNA NUEVA CITA A LA CLASE DE CITAS
export function nuevaCita(e) {
  e.preventDefault();

  //Extraer la información del objeto de cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  //Validar campos
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatiorios", "error");

    return;
  }

  if (editando) {
    ui.imprimirAlerta("Editado Correctamente");

    //Pasar el objeto de la cita a edición
    administrarCitas.editarCita({ ...citaObj });

    //Regresar el texto del btn a su estado original
    formulario.querySelector('button[type="submit"').textContent = "Crear Cita";

    //Quitar modo edición
    editando = false;
  } else {
    //Generar un id único
    citaObj.id = Date.now();

    //Creando cita
    administrarCitas.agregarCitas({ ...citaObj });

    //Mensaje de agregado correctamente
    ui.imprimirAlerta("Se agregó correctamente");
  }

  //Reinciar el objeto para la validación
  reiniciarObjeto();

  //Reiniciar formulario
  formulario.reset();

  //Mostrar HTML de las citas
  ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}

export function eliminarCita(id) {
  //Eliminar la cita
  administrarCitas.eliminarCita(id);

  //Mueste un mensaje
  ui.imprimirAlerta("La cita se elimino correctamente");

  //Refrescar las citas
  ui.imprimirCitas(administrarCitas);
}

//Cargar los daatos y el modo edición
export function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  //llenar los inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  //Llenar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  //Cmabiar el texto del botón
  formulario.querySelector('button[type="submit"').textContent =
    "GUARDAR CAMBIOS";

  editando = true;
}
