import { supabase } from "./supabase.js";

// inputs
const txtId = document.getElementById("txtId");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtCorreo = document.getElementById("txtCorreo");
const txtCarrera = document.getElementById("txtCarrera");
const txtFechaNac = document.getElementById("txtFechaNac");
const txtSearch = document.getElementById("txtSearch");

// botones
const btnAdd = document.getElementById("btnAdd");
const btnLoad = document.getElementById("btnLoad");
const btnCancel = document.getElementById("btnCancel");

// tabla
const tbody = document.getElementById("tbodyStudents");

// eventos
btnLoad.addEventListener("click", consultarEstudiantesPorNombre);
btnAdd.addEventListener("click", guardarEstudiante);
btnCancel.addEventListener("click", limpiarFormulario);

// cargar al inicio
window.onload = consultarEstudiantes;

//********************************
// CONSULTAR
//********************************
async function consultarEstudiantes() {
  const { data, error } = await supabase
    .from("Estudiantes")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  tbody.innerHTML = "";

  data.forEach((r) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${r.nombre}</td>
      <td>${r.apellido}</td>
      <td>${r.correo}</td>
      <td>${r.carrera}</td>
      <td>
        <button onclick="editar(${r.id})">Editar</button>
        <button onclick="eliminar(${r.id})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

//********************************
// CONSULTAR POR NOMBRE
//********************************
async function consultarEstudiantesPorNombre() {
  const nombre = txtSearch.value.trim();
  if (!nombre) return consultarEstudiantes();

  const { data, error } = await supabase
    .from("Estudiantes")
    .select("*")
    .ilike("nombre", `%${nombre}%`);

  if (error) {
    console.error(error);
    return;
  }

  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>No se encontraron estudiantes</td></tr>";
    return;
  }

  data.forEach((r) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${r.nombre}</td>
      <td>${r.apellido}</td>
      <td>${r.correo}</td>
      <td>${r.carrera}</td>
      <td>
        <button onclick="editar(${r.id})">Editar</button>
        <button onclick="eliminar(${r.id})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

//********************************
// GUARDAR
//********************************
async function guardarEstudiante() {
  const estudiante = {
    nombre: txtNombre.value,
    apellido: txtApellido.value,
    correo: txtCorreo.value,
    carrera: txtCarrera.value,
  };

  if (!estudiante.nombre || !estudiante.apellido) {
    alert("Complete los campos");
    return;
  }

  if (txtId.value) {
    await supabase
      .from("Estudiantes")
      .update(estudiante)
      .eq("id", txtId.value);
  } else {
    await supabase
      .from("Estudiantes")
      .insert([estudiante]);
  }

  limpiarFormulario();
  consultarEstudiantes();
}

//********************************
// ELIMINAR
//********************************
window.eliminar = async (id) => {
  await supabase
    .from("Estudiantes")
    .delete()
    .eq("id", id);

  consultarEstudiantes();
};

//********************************
// EDITAR
//********************************
window.editar = async (id) => {
  const { data } = await supabase
    .from("Estudiantes")
    .select("*")
    .eq("id", id)
    .single();

  txtId.value = data.id;
  txtNombre.value = data.nombre;
  txtApellido.value = data.apellido;
  txtCorreo.value = data.correo;
  txtCarrera.value = data.carrera;
  txtFechaNac.value = "";
};

//********************************
// LIMPIAR
//********************************
function limpiarFormulario() {
  txtId.value = "";
  txtNombre.value = "";
  txtApellido.value = "";
  txtCorreo.value = "";
  txtCarrera.value = "";
  txtFechaNac.value = "";
}