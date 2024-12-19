document.addEventListener("DOMContentLoaded", () => {
    const enviarButton = document.getElementById("enviarDatos");
    const form = document.getElementById("formPasajero");
    const mensajeDiv = document.getElementById("mensaje");

    // Agregar evento de click al botón de enviar
    enviarButton.addEventListener("click", async (e) => {
        e.preventDefault(); // Evita el envío predeterminado del formulario
        const pasajero = obtenerDatosPersonales(); // Llamamos a la función para obtener los datos

        // Verificar si los datos son válidos antes de continuar
        if (!pasajero) {
            console.log("No se obtuvieron datos del formulario.");
            return;
        }

        console.log("Datos del pasajero para enviar:", pasajero); // Verificar qué datos se están enviando

        guardarPasajeroEnLocalStorage(pasajero); // Guardamos los datos en LocalStorage

        try {
            // Enviar los datos al servidor en formato JSON
            const response = await fetch("agregar_pasajeros.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pasajero) // Convertir el objeto a JSON
            });

            // Verificar si la respuesta es exitosa (HTTP 200)
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }

            // Intentar convertir la respuesta a JSON
            const result = await response.json();
            console.log("Respuesta del servidor:", result);

            // Verificar si la respuesta contiene éxito
            if (result.success) {
                console.log("Entre al if");
                mensajeDiv.innerHTML = `<p class="alert alert-success">${result.message}</p>`;
                form.reset();
                // Redirigir a la página "miVuelo.html" después de un corto retardo
                setTimeout(() => {
                    window.location.href = "miVuelo.html"; // Redirigir correctamente
                }, 2000);
            } else {
                console.log("Entre al else");
                mensajeDiv.innerHTML = `<p class="alert alert-danger">${result.message}</p>`;
                // Si los datos no se han procesado correctamente, redirigir a datosPersonales.html
                setTimeout(() => {
                    window.location.href = "datosPersonales.html"; // Redirige a la página de datos personales
                }, 2000); // Retardo de 2 segundos antes de la redirección
            }
        } catch (error) {
            console.log("Error al procesar la respuesta JSON:", error);
          //  mensajeDiv.innerHTML = `<p class="alert alert-danger">Ocurrió un error al enviar los datos. Por favor, inténtalo nuevamente.</p>`;
            setTimeout(() => {
                window.location.href = "miVuelo.html"; // Redirige a la página de datos personales en caso de error
            }, 2000); // Retardo de 2 segundos antes de la redirección
        }
    });
});

// Función para obtener los datos del formulario
function obtenerDatosPersonales() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fechaNacimiento = document.getElementById("fech_naci").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const pais = document.getElementById("nacionalidad").value;
    const dni = document.getElementById("dni").value;
    const genero = document.getElementById("genero").value;

    // Verificar si los valores de nacionalidad y género están seleccionados
    if (!pais || !genero) {
        alert("Por favor, selecciona una nacionalidad y un género.");
        return null; // Si falta la nacionalidad o el género, retornamos null
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
    let pasajeros = JSON.parse(localStorage.getItem("pasajeros")) || [];
    pasajeros.push(pasajero);
    localStorage.setItem("pasajeros", JSON.stringify(pasajeros));
}