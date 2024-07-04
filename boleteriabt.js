document.addEventListener('DOMContentLoaded', () => {
    const butacas = document.querySelectorAll('.butaca-btn'); // Agarra todos los elementos con clase butaca

    // Verifica si hay butacas ocupadas almacenadas en el Local Storage y las carga
    const butacasOcupadas = JSON.parse(localStorage.getItem('butacasOcupadas')) || []; // Asegura que es un array si no hay nada en el Local Storage
    butacasOcupadas.forEach(Id => {
        const elementoButaca = document.getElementById(Id); // Itera sobre el ID de butaca.
        if (elementoButaca) {
            elementoButaca.classList.add('ocupado'); // Si el elemento existe se le agrega la clase ocupado
        }
    });

    // Evento de click a cada butaca
    butacas.forEach(butaca => {
        butaca.addEventListener('click', () => {
            if (butaca.classList.contains('ocupado')) {
                return; // Si la butaca está ocupada, no hacer nada
            }
            const butacaID = butaca.id; // agarra el ID de la butaca clickeada
            if (butaca.classList.contains('seleccionada')) {
                butaca.classList.remove('seleccionada'); // desmarca la butaca como seleccionada
                const index = butacasOcupadas.indexOf(butacaID); // encuentra el índice de la butaca en el array
                if (index !== -1) {
                    butacasOcupadas.splice(index, 1); // remueve la butaca seleccionada de la lista de butacas ocupadas
                }
            } else {
                butaca.classList.add('seleccionada'); // marca la butaca como seleccionada
                butacasOcupadas.push(butacaID); // agrega la butaca seleccionada a la lista de butacas ocupadas
            }
            // Actualiza y guarda las butacas ocupadas en el Local Storage
            localStorage.setItem('butacasOcupadas', JSON.stringify(butacasOcupadas));
        });
    });
});
