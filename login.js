function toggleContent() {
	var container = document.querySelector('.container-custom');
	container.classList.toggle('rotate');
}

function validateLogin() {
	var nombre = document.getElementById('loginNombre').value;
	var password = document.getElementById('loginPassword').value;

	if (nombre === '' || password === '') {
		alert('Todos los campos son obligatorios.');
		if (nombre === '') {
			document.getElementById('loginNombre').focus();
		} else {
			document.getElementById('loginPassword').focus();
		}
	} else {
		var users = JSON.parse(localStorage.getItem('users')) || [];
		var user = users.find(
			(user) => user.nombre === nombre && user.password === password
		);

		if (user) {
			alert('¡Bienvenido!');
		} else {
			alert('Usuario o contraseña incorrectos.');
		}
	}
}

function validateSignUp() {
	var nombre = document.getElementById('signupNombre').value;
	var email = document.getElementById('signupEmail').value;
	var password = document.getElementById('signupPassword').value;

	if (nombre === '' || email === '' || password === '') {
		alert('Todos los campos son obligatorios.');
		if (nombre === '') {
			document.getElementById('signupNombre').focus();
		} else if (email === '') {
			document.getElementById('signupEmail').focus();
		} else {
			document.getElementById('signupPassword').focus();
		}
	} else if (!validateEmail(email)) {
		alert('Por favor, introduce un email válido.');
		document.getElementById('signupEmail').focus();
	} else {
		var users = JSON.parse(localStorage.getItem('users')) || [];
		var newUser = {
			nombre: nombre,
			email: email,
			password: password,
		};

		var userExists = users.some(
			(user) =>
				user.nombre === newUser.nombre &&
				user.email === newUser.email &&
				user.password === newUser.password
		);

		if (userExists) {
			alert('Este usuario ya está registrado.');
		} else {
			users.push(newUser);
			localStorage.setItem('users', JSON.stringify(users));
			alert('Formulario de Sign up enviado correctamente.');
		}
	}
}

function validateEmail(email) {
	var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}
