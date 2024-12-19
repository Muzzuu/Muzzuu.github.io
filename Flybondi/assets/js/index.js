// Función que verifica si el origen y destino son válidos y diferentes
function checkSameSelection() {
    const origenSelect = document.getElementById("origen");
    const destinoSelect = document.getElementById("destino");
    const enviarBtn = document.getElementById("enviarBtn");

    // Activa el botón sólo si ambos campos son válidos y diferentes
    if (origenSelect.value !== "Origen" && destinoSelect.value !== "Destino" && origenSelect.value !== destinoSelect.value) {
        enviarBtn.disabled = false;

        // Almacena los valores en el localStorage
        localStorage.setItem("Origen", origenSelect.value);
        localStorage.setItem("Destino", destinoSelect.value);
        localStorage.setItem("cantidadPasajeros", 1);
    } else {
        enviarBtn.disabled = true;
        destinoSelect.selectedIndex = 0;
    }
}

// Función para enviar el formulario usando fetch
function submitForm() {
    // Obtiene el formulario y los datos seleccionados
    const form = document.getElementById('routeForm');
    const formData = new FormData(form);

    // Usa fetch para enviar los datos a agregar_rutas.php
    fetch('agregar_ruta.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        // Verifica si la respuesta tiene el tipo de contenido esperado
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return response.json(); // Si es JSON, lo parseamos
        } else {
            throw new Error('Esperaba JSON, pero recibí: ' + contentType);
        }
    })
    .then(data => {
        // Manejo de la respuesta si es exitosa
        if (data.success) {
            alert(data.message);
            // Limpia la selección de los selectores y desactiva el botón de nuevo
            document.getElementById('origen').selectedIndex = 0;
            document.getElementById('destino').selectedIndex = 0;
            document.getElementById('enviarBtn').disabled = true;
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        // Manejo de errores generales
        console.error('Error:', error);
    });

    window.location.href = "seleccionDia.html";

}

// Actualiza el evento para llamar a submitForm en lugar de enviarBtn
document.getElementById('enviarBtn').addEventListener('click', submitForm);

// Añade el evento onchange a los selects para activar la verificación al cambiar la selección
document.getElementById('origen').addEventListener('change', checkSameSelection);
document.getElementById('destino').addEventListener('change', checkSameSelection);

// Desactiva el botón de envío inicialmente hasta que las selecciones sean válidas
document.getElementById('enviarBtn').disabled = true;

// La función `enviarBtn` ya no es necesaria ya que ahora se está usando `submitForm` para enviar el formulario
// Eliminada la función de redirección `enviarBtn()` que se usaba previamente
