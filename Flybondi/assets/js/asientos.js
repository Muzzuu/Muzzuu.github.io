const seats = document.querySelectorAll('.seat.available'); // Todos los asientos disponibles
const selectedSeatsList = document.getElementById('selected-seats');
const BtnContinuarr = document.getElementById("enviarBtnContinuar");

// Función para actualizar los asientos seleccionados y ocupados
function selecionarAsiento() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    selectedSeatsList.innerHTML = ''; // Limpiar la lista de asientos seleccionados

    const selectedSeatsArray = []; // Array para almacenar los asientos seleccionados

    selectedSeats.forEach(seat => {
        const seatNumber = seat.innerText;
        const span = document.createElement('span');
        span.textContent = seatNumber;
        span.style.backgroundColor = '#ffc107';
        span.style.color = 'white';
        span.style.padding = '5px 10px';
        span.style.margin = '5px';
        span.style.borderRadius = '5px';
        selectedSeatsList.appendChild(span);

        selectedSeatsArray.push(seatNumber);
    });

    // Obtener los asientos ocupados previamente desde localStorage
    let asientosOcupados = JSON.parse(localStorage.getItem("ocupados")) || [];

    // Sumar los asientos seleccionados al array de asientos ocupados
    asientosOcupados = [...asientosOcupados, ...selectedSeatsArray];

    // Guardar los nuevos asientos ocupados en localStorage
    localStorage.setItem("ocupados", JSON.stringify(asientosOcupados));

    // Guardar los asientos seleccionados en localStorage
    localStorage.setItem("asientoSeleccionado", JSON.stringify(selectedSeatsArray));

    // Deshabilitar el botón de continuar si no hay asientos seleccionados
    BtnContinuarr.disabled = selectedSeatsArray.length === 0;
}

// Función para cargar los asientos ocupados al cargar la página
window.addEventListener('DOMContentLoaded', (event) => {
    const seats = document.querySelectorAll('.seat');
    
    // Recuperar los asientos ocupados previamente desde localStorage
    const asientosOcupados = JSON.parse(localStorage.getItem("ocupados")) || [];

    // Deshabilitar los asientos ocupados
    seats.forEach(seat => {
        if (asientosOcupados.includes(seat.innerText)) {
            seat.classList.add('occupied');  // Añadir clase que marca los asientos ocupados
            seat.classList.remove('available');  // Eliminar clase de disponibles
            seat.style.cursor = 'not-allowed';  // Hacer que no sea seleccionable
        }
    });

    const asientoSeleccionado = JSON.parse(localStorage.getItem("asientoSeleccionado")) || [];
    asientoSeleccionado.forEach(seatNumber => {
        const seat = Array.from(seats).find(s => s.innerText === seatNumber);
        if (seat) {
            seat.classList.add('selected');
        }
    });
});

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('occupied')) {  
            seats.forEach(s => s.classList.remove('selected')); 
            seat.classList.add('selected');  
            selecionarAsiento();  
        }
    });
});
function enviarBtnContinuar() {
    window.location.href = "datosPersonales.html";  
}