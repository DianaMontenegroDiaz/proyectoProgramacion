document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');

    // Expresiones regulares para validar campos
    const expresiones = {
        nombre1: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        nombre2: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        apellido1: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
        apellido2: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 números.
        password: /^.{4,12}$/ // 4 a 12 caracteres.
    };

    const campos = {
        nombre1: false,
        apellido1: false,
        nombre2: false,
        apellido2: false,
        email: false,
        telefono: false,
        password: false,
        password2: false
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre1":
            case "nombre2":
                validarCampo(expresiones.nombre1, e.target, e.target.name);
                break;
            case "apellido1":
            case "apellido2":
                validarCampo(expresiones.apellido1, e.target, e.target.name);
                break;
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
                break;
            case "telefono":
                validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
                validarPassword2(); // Para verificar que ambas contraseñas coincidan
                break;
            case "password2":
                validarPassword2();
                break;
        }
    };

    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            campos[campo] = true;
        } else {
            campos[campo] = false;
        }
    };

    const validarPassword2 = () => {
        const inputPassword1 = document.getElementById('password');
        const inputPassword2 = document.getElementById('password2');

        if (inputPassword1.value !== inputPassword2.value) {
            campos['password2'] = false;
        } else {
            campos['password2'] = true;
        }
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        if (campos.nombre1 && campos.apellido1 && campos.email && campos.telefono && campos.password && campos.password2) {
            formulario.reset();
            alert("Formulario enviado correctamente.");
        } else {
            alert("Por favor, completa todos los campos correctamente.");
        }
    });
});
