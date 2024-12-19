const seats = document.querySelectorAll('.seat.available');
const selectedSeatsList = document.getElementById('selected-seats');

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        // Alternar entre las clases "selected" y "available"
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            seat.classList.add('available');
        } else if (seat.classList.contains('available')) {
            seat.classList.remove('available');
            seat.classList.add('selected');
        }

        // Actualizar la lista de asientos seleccionados
        updateSelectedSeats();
    });
});

function updateSelectedSeats() {
    // Obtener todos los asientos seleccionados
    const selectedSeats = document.querySelectorAll('.seat.selected');
    
    // Limpiar la lista
    selectedSeatsList.innerHTML = '';

    // Agregar cada asiento seleccionado a la lista
    selectedSeats.forEach(seat => {
        const seatNumber = seat.innerText;
        const li = document.createElement('li');
        li.textContent = seatNumber;
        selectedSeatsList.appendChild(li);
    });
}