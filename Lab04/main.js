function mostrarDatos() {
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();

    if (nombre === "" || email === "") {
        alert("Debe completar todos los campos.");
    } else {
        alert(`Datos ingresados:

Nombre: ${nombre}
Email: ${email}`);
    }
}