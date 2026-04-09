import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://TU_URL.supabase.co";
const supabaseKey = "TU_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

// ELEMENTOS
const btnAdd = document.getElementById("btnAdd");
const btnLoad = document.getElementById("btnLoad");
const btnCancel = document.getElementById("btnCancel");

const txtId = document.getElementById("txtId");
const txtNombre = document.getElementById("txtNombre");
const txtCorreo = document.getElementById("txtCorreo");
const txtActivo = document.getElementById("txtActivo");
const txtSearch = document.getElementById("txtSearch");

const tbody = document.getElementById("tbodyClientes");

// ================= GUARDAR / EDITAR =================
btnAdd.addEventListener("click", async () => {

  const cliente = {
    Nombre: txtNombre.value,
    Correo: txtCorreo.value,
    Activo: txtActivo.value === "true"
  };

  let error;

  if (txtId.value === "") {
    // INSERTAR
    ({ error } = await supabase.from("Cliente").insert([cliente]));
  } else {
    // ACTUALIZAR
    ({ error } = await supabase
      .from("Cliente")
      .update(cliente)
      .eq("IdCliente", txtId.value));
  }

  if (error) {
    alert(error.message);
  } else {
    alert("Guardado correctamente ✅");
    resetForm();
    loadClientes();
  }
});

// ================= CONSULTAR =================
btnLoad.addEventListener("click", loadClientes);

async function loadClientes() {

  const search = txtSearch.value;

  let query = supabase.from("Cliente").select("*");

  if (search !== "") {
    query = query.ilike("Nombre", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    alert(error.message);
    return;
  }

  tbody.innerHTML = "";

  data.forEach(cliente => {
    const row = `
      <tr>
        <td>${cliente.Nombre}</td>
        <td>${cliente.Correo}</td>
        <td>${cliente.Activo ? "Activo" : "Inactivo"}</td>
        <td>
          <button onclick="editCliente(${cliente.IdCliente}, '${cliente.Nombre}', '${cliente.Correo}', ${cliente.Activo})">Editar</button>
          <button onclick="deleteCliente(${cliente.IdCliente})">Eliminar</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// ================= EDITAR =================
window.editCliente = (id, nombre, correo, activo) => {
  txtId.value = id;
  txtNombre.value = nombre;
  txtCorreo.value = correo;
  txtActivo.value = activo.toString();
};

// ================= ELIMINAR =================
window.deleteCliente = async (id) => {

  if (!confirm("¿Eliminar cliente?")) return;

  const { error } = await supabase
    .from("Cliente")
    .delete()
    .eq("IdCliente", id);

  if (error) {
    alert(error.message);
  } else {
    loadClientes();
  }
};

// ================= RESET =================
btnCancel.addEventListener("click", resetForm);

function resetForm() {
  txtId.value = "";
  txtNombre.value = "";
  txtCorreo.value = "";
  txtActivo.value = "true";
}