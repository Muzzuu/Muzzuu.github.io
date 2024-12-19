document.addEventListener("DOMContentLoaded", () => {
    // Asignar el evento al botón de envío
    const enviarButton = document.getElementById("enviarDatos");
    const form = document.getElementById("formPasajero");
    const mensajeDiv = document.getElementById("mensaje");

    // Agregar evento de click al botón de enviar
    enviarButton.addEventListener("click", async (e) => {
        e.preventDefault(); // Evita el envío predeterminado del formulario
        const pasajero = obtenerDatosPersonales(); // Llamamos a la función para obtener los datos

        // Verificar si los datos son válidos antes de continuar
        if (!pasajero) return;

        guardarPasajeroEnLocalStorage(pasajero); // Guardamos los datos en LocalStorage

        const formData = new FormData(form);
    
        try {
            // Enviar los datos al servidor mediante fetch
            const response = await fetch("agregar_pasajeros.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                mensajeDiv.innerHTML = `<p class="alert alert-success">${result.message}</p>`;
                form.reset();
                // Redirigir a la página "miVuelo.html" después de un corto retardo
                setTimeout(() => {
                    window.location.href = "miVuelo.html";
                }, 2000);
            } else {
                mensajeDiv.innerHTML = `<p class="alert alert-danger">${result.message}</p>`;
            }
        } catch (error) {
            console.log(error);
          // mensajeDiv.innerHTML = `<p class="alert alert-danger">Ocurrió un error al enviar los datos. Por favor, inténtalo nuevamente.</p>`;
        }
        window.location.href = "miVuelo.html";
    });
});

// Función para obtener los datos del formulario
function obtenerDatosPersonales() {
    // Capturar los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fechaNacimiento = document.getElementById("fech_naci").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const pais = document.getElementById("nacionalidad").value;
    const dni = document.getElementById("dni").value;
    const genero = document.getElementById("genero").value;

    // Verificar si los valores de nacionalidad y genero están seleccionados
    if (!pais) {
        alert("Por favor, selecciona una nacionalidad.");
        return null; // Si falta la nacionalidad, retornamos null
    }
    if (!genero) {
        alert("Por favor, selecciona un género.");
        return null; // Si falta el género, retornamos null
    }

    // Crear un objeto con los datos personales del pasajero
    const pasajero = {
        nombre,
        apellido,
        fechaNacimiento,
        email,
        telefono,
        pais,
        dni,
        genero
    };

    console.log("Datos del pasajero:", pasajero); // Para verificar si los datos se capturan correctamente
    return pasajero; // Retornar el objeto de datos personales
}

// Función para guardar el pasajero en el localStorage
function guardarPasajeroEnLocalStorage(pasajero) {
    // Obtener el array de pasajeros del localStorage, o crear uno nuevo si no existe
    let pasajeros = JSON.parse(localStorage.getItem("pasajeros")) || [];
    // Agregar el nuevo pasajero al array
    pasajeros.push(pasajero);
    // Guardar el array actualizado en el localStorage
    localStorage.setItem("pasajeros", JSON.stringify(pasajeros));
}