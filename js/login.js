function toggleContent() {
    var container = document.querySelector('.container-custom');
    container.classList.toggle('rotate');
}

function validateLogin() {
    var nombre = document.getElementById('loginNombre').value;
    var password = document.getElementById('loginPassword').value;

    if (nombre === "" || password === "") {
        showError('Todos los campos son obligatorios.', nombre === "" ? 'loginNombre' : 'loginPassword');
    } else {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var user = users.find(user =>
            user.nombre === nombre && user.password === password
        );

        if (user) {
            // Guarda los datos del usuario en localStorage para la sesión actual
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            showError('Usuario o contraseña incorrectos.', 'loginNombre');
        }
    }
}

function validateSignUp() {
    var nombre = document.getElementById('signupNombre').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;

    if (nombre === "" || email === "" || password === "") {
        showError('Todos los campos son obligatorios.', nombre === "" ? 'signupNombre' : (email === "" ? 'signupEmail' : 'signupPassword'));
    } else if (!validateEmail(email)) {
        showError('Por favor, introduce un email válido.', 'signupEmail');
    } else {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var newUser = {
            nombre: nombre,
            email: email,
            password: password,
            butacasSeleccionadas: []  // Inicializa el historial de butacas seleccionadas
        };

        var userExists = users.some(user =>
            user.nombre === newUser.nombre || user.email === newUser.email
        );

        if (userExists) {
            showError('Este usuario ya está registrado.', 'signupEmail');
        } else {
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            // Guarda el nuevo usuario en localStorage y redirige a la página de inicio
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            window.location.href = 'index.html';
        }
    }
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(message, fieldId) {
    alert(message);
    document.getElementById(fieldId).focus();
}
