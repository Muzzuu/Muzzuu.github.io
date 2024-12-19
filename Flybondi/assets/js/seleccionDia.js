// Rellenar opciones de días
const diaSelect = document.getElementById('diaSelect');
for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    diaSelect.appendChild(option);
}

// Rellenar opciones de meses
const mesSelect = document.getElementById('mesSelect');
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
for (let i = 0; i < 12; i++) {
    const option = document.createElement('option');
    option.value = meses[i];
    option.textContent = meses[i];
    mesSelect.appendChild(option);
}

// Rellenar opciones de años
const anioSelect = document.getElementById('anioSelect');
for (let i = 2024; i <= 2030; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    anioSelect.appendChild(option);
}

// Evento de clic en el botón Enviar
const horarioSelect = document.getElementById('horarioSelect');
const enviarBtnC = document.getElementById("enviarBtnC");

// Activar el botón solo si se seleccionan todas las opciones
function checkSelection() {
    if (diaSelect.value && mesSelect.value && anioSelect.value) {
        enviarBtnC.disabled = false;
        // Guardar los valores seleccionados en localStorage
        localStorage.setItem("Dia", diaSelect.value);
        localStorage.setItem("Mes", mesSelect.value);
        localStorage.setItem("Año", anioSelect.value);
    } else {
        enviarBtnC.disabled = true;
    }

    if (horarioSelect.value) {
        localStorage.setItem("Horario", horarioSelect.value);
    } 
}

diaSelect.addEventListener('change', checkSelection);
mesSelect.addEventListener('change', checkSelection);
anioSelect.addEventListener('change', checkSelection);
horarioSelect.addEventListener('change', checkSelection);

document.getElementById("enviarBtnC").disabled = false;

function enviarBtnCon() {
    const dia = document.getElementById("diaSelect").value;
    const mes = document.getElementById("mesSelect").value;
    const anio = document.getElementById("anioSelect").value;
    const horario = document.getElementById("horarioSelect").value;

    if (dia && mes && anio && horario) {
        const fechaYHora = {
            dia: dia,
            mes: mes,
            anio: anio,
            horario: horario
        };

        fetch("guardar_fecha_hora.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fechaYHora)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("¡Fecha y hora guardadas exitosamente!");
            } else {
                alert("Hubo un error al guardar los datos.");
            }
        })
        .catch(error => console.error("Error:", error));
    } else {
        alert("Por favor, seleccione todos los campos antes de continuar.");
    }

    window.location.href="asientos.html"
}
