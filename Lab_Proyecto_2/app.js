import supabase from "./supabase.js";

// ================= MOSTRAR SECCIONES =================
function mostrarSeccion(seccion) {
  const clientes = document.getElementById("clientesSection");
  const entrenadores = document.getElementById("entrenadoresSection");
  const inscripciones = document.getElementById("inscripcionesSection");
  const planes = document.getElementById("planesSection");

  if (!clientes || !entrenadores || !inscripciones || !planes) {
    console.error("Falta uno de los IDs de las secciones en el HTML");
    return;
  }

  clientes.style.display = "none";
  entrenadores.style.display = "none";
  inscripciones.style.display = "none";
  planes.style.display = "none";

  if (seccion === "clientes") clientes.style.display = "block";
  if (seccion === "entrenadores") entrenadores.style.display = "block";
  if (seccion === "inscripciones") inscripciones.style.display = "block";
  if (seccion === "planes") planes.style.display = "block";
}

// ================= BOTONES SIDEBAR =================
function activarBoton(e) {
  document
    .querySelectorAll(".sidebar a")
    .forEach((a) => a.classList.remove("active"));
  e.target.classList.add("active");
}

document.getElementById("btnClientes").addEventListener("click", (e) => {
  e.preventDefault();
  activarBoton(e);
  mostrarSeccion("clientes");
});

document.getElementById("btnEntrenadores").addEventListener("click", (e) => {
  e.preventDefault();
  activarBoton(e);
  mostrarSeccion("entrenadores");
});

document.getElementById("btnInscripciones").addEventListener("click", (e) => {
  e.preventDefault();
  activarBoton(e);
  mostrarSeccion("inscripciones");
});

document.getElementById("btnPlanes").addEventListener("click", (e) => {
  e.preventDefault();
  activarBoton(e);
  mostrarSeccion("planes");
});

// ================= CLIENTES =================
const formCliente = document.getElementById("formCliente");

if (formCliente) {
  formCliente.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cliente = {
      Nombre: document.getElementById("nombreCliente").value,
      Correo: document.getElementById("correoCliente").value,
      Activo: document.getElementById("activoCliente").value === "true",
    };

    const { error } = await supabase.from("Cliente").insert([cliente]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Cliente guardado ✅");
      formCliente.reset();
      cargarClientes();
      cargarDashboard();
    }
  });
}

// ================= ENTRENADORES =================
const formEntrenador = document.getElementById("formEntrenador");

if (formEntrenador) {
  formEntrenador.addEventListener("submit", async (e) => {
    e.preventDefault();

    const entrenador = {
      IdEntrenador: parseInt(document.getElementById("idEntrenador").value),
      Nombre: document.getElementById("nombreEntrenador").value,
      Correo: document.getElementById("correoEntrenador").value,
      Activo: document.getElementById("activoEntrenador").value === "true",
    };

    const { error } = await supabase.from("Entrenador").insert([entrenador]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Entrenador guardado ✅");
      formEntrenador.reset();
      cargarEntrenadores();
      cargarDashboard();
    }
  });
}

// ================= INSCRIPCIONES =================
const formInscripcion = document.getElementById("formInscripcion");

if (formInscripcion) {
  formInscripcion.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inscripcion = {
      IdInscripcion: parseInt(document.getElementById("idInscripcion").value),
      IdCliente_FK: parseInt(document.getElementById("idClienteFK").value),
      IdPlan_FK: parseInt(document.getElementById("idPlanFK").value),
      FechaInicio: document.getElementById("fechaInicio").value,
      Estado: document.getElementById("estado").value,
    };

    const { error } = await supabase.from("Inscripcion").insert([inscripcion]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Inscripción guardada ✅");
      formInscripcion.reset();
      cargarInscripciones();
      cargarDashboard();
    }
  });
}

// ================= PLANES =================
const formPlan = document.getElementById("formPlan");

if (formPlan) {
  formPlan.addEventListener("submit", async (e) => {
    e.preventDefault();

    const plan = {
      Nombre: document.getElementById("nombrePlan").value,
      Precio: parseFloat(document.getElementById("precioPlan").value),
      Estado: document.getElementById("estadoPlan").value,
    };

    const { error } = await supabase.from("Plan").insert([plan]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Plan guardado ✅");
      formPlan.reset();
      cargarPlanes();
    }
  });
}

// ================= MOSTRAR CLIENTES =================
async function cargarClientes() {
  const { data, error } = await supabase.from("Cliente").select("*");

  if (error) {
    alert(error.message);
    return;
  }

  const tbody = document.getElementById("tbodyClientes");
  if (!tbody) return;

  tbody.innerHTML = "";

  data.forEach((cliente) => {
    const fila = `
      <tr>
        <td>${cliente.IdCliente}</td>
        <td>${cliente.Nombre}</td>
        <td>${cliente.Correo}</td>
        <td>${cliente.Activo ? "Activo" : "Inactivo"}</td>
        <td>
          <button onclick="eliminarCliente(${cliente.IdCliente})">Eliminar</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += fila;
  });
}

// ================= MOSTRAR ENTRENADORES =================
async function cargarEntrenadores() {
  const { data, error } = await supabase.from("Entrenador").select("*");

  if (error) {
    alert(error.message);
    return;
  }

  const tbody = document.getElementById("tbodyEntrenadores");
  if (!tbody) return;

  tbody.innerHTML = "";

  data.forEach((entrenador) => {
    const fila = `
      <tr>
        <td>${entrenador.IdEntrenador}</td>
        <td>${entrenador.Nombre}</td>
        <td>${entrenador.Correo}</td>
        <td>${entrenador.Activo ? "Activo" : "Inactivo"}</td>
        <td>
          <button onclick="eliminarEntrenador(${entrenador.IdEntrenador})">Eliminar</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += fila;
  });
}

// ================= MOSTRAR INSCRIPCIONES =================
async function cargarInscripciones() {
  const { data, error } = await supabase.from("Inscripcion").select("*");

  if (error) {
    alert(error.message);
    return;
  }

  const tbody = document.getElementById("tbodyInscripciones");
  if (!tbody) return;

  tbody.innerHTML = "";

  data.forEach((inscripcion) => {
    const fila = `
      <tr>
        <td>${inscripcion.IdInscripcion}</td>
        <td>${inscripcion.IdCliente_FK}</td>
        <td>${inscripcion.IdPlan_FK}</td>
        <td>${inscripcion.FechaInicio}</td>
        <td>${inscripcion.Estado}</td>
        <td>
          <button onclick="eliminarInscripcion(${inscripcion.IdInscripcion})">Eliminar</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += fila;
  });
}

// ================= MOSTRAR PLANES =================
async function cargarPlanes() {
  const { data, error } = await supabase.from("Plan").select("*");

  if (error) {
    alert(error.message);
    return;
  }

  const tbody = document.getElementById("tbodyPlanes");
  if (!tbody) return;

  tbody.innerHTML = "";

  data.forEach((plan) => {
    const fila = `
      <tr>
        <td>${plan.IdPlan}</td>
        <td>${plan.Nombre}</td>
        <td>${plan.Precio}</td>
        <td>${plan.Estado}</td>
        <td>
          <button onclick="eliminarPlan(${plan.IdPlan})">Eliminar</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += fila;
  });
}

// ================= ELIMINAR CLIENTE =================
window.eliminarCliente = async (id) => {
  if (!confirm("¿Eliminar cliente?")) return;

  const { error } = await supabase.from("Cliente").delete().eq("IdCliente", id);

  if (error) {
    alert(error.message);
  } else {
    cargarClientes();
    cargarDashboard();
  }
};

// ================= ELIMINAR ENTRENADOR =================
window.eliminarEntrenador = async (id) => {
  if (!confirm("¿Eliminar entrenador?")) return;

  const { error } = await supabase
    .from("Entrenador")
    .delete()
    .eq("IdEntrenador", id);

  if (error) {
    alert(error.message);
  } else {
    cargarEntrenadores();
    cargarDashboard();
  }
};

// ================= ELIMINAR INSCRIPCION =================
window.eliminarInscripcion = async (id) => {
  if (!confirm("¿Eliminar inscripción?")) return;

  const { error } = await supabase
    .from("Inscripcion")
    .delete()
    .eq("IdInscripcion", id);

  if (error) {
    alert(error.message);
  } else {
    cargarInscripciones();
    cargarDashboard();
  }
};

// ================= ELIMINAR PLAN =================
window.eliminarPlan = async (id) => {
  if (!confirm("¿Eliminar plan?")) return;

  const { error } = await supabase
    .from("Plan")
    .delete()
    .eq("IdPlan", id);

  if (error) {
    alert(error.message);
  } else {
    cargarPlanes();
  }
};

// ================= DASHBOARD =================
async function cargarDashboard() {
  const { count: totalClientes } = await supabase
    .from("Cliente")
    .select("*", { count: "exact", head: true });

  const { count: totalEntrenadores } = await supabase
    .from("Entrenador")
    .select("*", { count: "exact", head: true });

  const { count: totalInscripciones } = await supabase
    .from("Inscripcion")
    .select("*", { count: "exact", head: true });

  const totalClientesEl = document.getElementById("totalClientes");
  const totalEntrenadoresEl = document.getElementById("totalEntrenadores");
  const totalInscripcionesEl = document.getElementById("totalInscripciones");

  if (totalClientesEl) totalClientesEl.textContent = totalClientes || 0;
  if (totalEntrenadoresEl) {
    totalEntrenadoresEl.textContent = totalEntrenadores || 0;
  }
  if (totalInscripcionesEl) {
    totalInscripcionesEl.textContent = totalInscripciones || 0;
  }
}

// ================= CARGA INICIAL =================
cargarClientes();
cargarEntrenadores();
cargarInscripciones();
cargarPlanes();
cargarDashboard();
mostrarSeccion("clientes");