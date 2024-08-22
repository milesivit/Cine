document.addEventListener('DOMContentLoaded', () => {
    const butacas = document.querySelectorAll('.butaca-btn');
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    const butacasOcupadas = JSON.parse(localStorage.getItem('butacasOcupadas')) || [];

    // Verifica si hay butacas ocupadas almacenadas y las carga
    butacasOcupadas.forEach(Id => {
        const elementoButaca = document.getElementById(Id);
        if (elementoButaca) {
            elementoButaca.classList.add('ocupado');
        }
    });

    // Evento de click a cada butaca
    butacas.forEach(butaca => {
        butaca.addEventListener('click', () => {
            if (butaca.classList.contains('ocupado')) {
                return;
            }
            const butacaID = butaca.id;
            let userButacas = user.butacasSeleccionadas || [];

            if (butaca.classList.contains('seleccionada')) {
                butaca.classList.remove('seleccionada');
                // Remove from global butacasOcupadas
                const index = butacasOcupadas.indexOf(butacaID);
                if (index !== -1) {
                    butacasOcupadas.splice(index, 1);
                }
                // Remove from user's selected butacas
                const userIndex = userButacas.indexOf(butacaID);
                if (userIndex !== -1) {
                    userButacas.splice(userIndex, 1);
                }
            } else {
                butaca.classList.add('seleccionada');
                // Add to global butacasOcupadas
                if (!butacasOcupadas.includes(butacaID)) {
                    butacasOcupadas.push(butacaID);
                }
                // Add to user's selected butacas
                if (!userButacas.includes(butacaID)) {
                    userButacas.push(butacaID);
                }
            }

            // Update user and global butacasOcupadas
            if (user) {
                user.butacasSeleccionadas = userButacas;
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                updateUserInList(user);
            }
            localStorage.setItem('butacasOcupadas', JSON.stringify(butacasOcupadas));
        });
    });

    function updateUserInList(updatedUser) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(user => user.email === updatedUser.email);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
});
