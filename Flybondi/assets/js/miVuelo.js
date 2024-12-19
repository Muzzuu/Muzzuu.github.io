
function mostrarDatosPersonales() {
    const pasajeros = JSON.parse(localStorage.getItem("pasajeros")) || [];
    const ultimoPasajero = pasajeros[pasajeros.length - 1]; // Obtener el último pasajero agregado

    // Mostrar datos en el HTML
    document.getElementById("nombre").innerText = ultimoPasajero.nombre;
    document.getElementById("apellido").innerText = ultimoPasajero.apellido;
    document.getElementById("fechaNacimiento").innerText = ultimoPasajero.fechaNacimiento;
    document.getElementById("email").innerText = ultimoPasajero.email;
    document.getElementById("telefono").innerText = ultimoPasajero.telefono;
    document.getElementById("pais").innerText = ultimoPasajero.pais;
    document.getElementById("dni").innerText = ultimoPasajero.dni;
    document.getElementById("genero").innerText = ultimoPasajero.genero;
}

function mostrarDatosReserva() {
   
    document.getElementById("origen").innerText = localStorage.getItem("Origen");
    document.getElementById("destino").innerText = localStorage.getItem("Destino");
    const dia = localStorage.getItem("Dia");
    const mes = localStorage.getItem("Mes");
    const anio = localStorage.getItem("Año");

    document.getElementById("fecha").innerText = dia && mes && anio ? `${dia} de ${mes} ${anio}` : "No disponible";
    document.getElementById("horario").innerText = localStorage.getItem("Horario") || "No disponible";
    const asientoSeleccionado = JSON.parse(localStorage.getItem("asientoSeleccionado")) || [];
    document.getElementById("asientos").innerText = asientoSeleccionado.length > 0 ? asientoSeleccionado.join(', ') : "No disponible";


mostrarDatosPersonales();
}

window.onload = mostrarDatosReserva;
function finalizarReserva() {
    alert("Reserva confirmada. ¡Gracias por elegirnos!");
    localStorage.removeItem("Origen")
    localStorage.removeItem("Destino")
    localStorage.removeItem("Dia")
    localStorage.removeItem("Mes")
    localStorage.removeItem("Año")
    localStorage.removeItem("fecha")
    localStorage.removeItem ("horario")
    window.location.href = "index.html";  
}