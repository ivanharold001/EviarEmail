document.addEventListener('DOMContentLoaded', function() {

    const objEmail = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    // sellecionar los elementos de la insterfaz
    const email = document.querySelector('#email');
    const asunto = document.querySelector('#asunto');
    const mensaje = document.querySelector('#mensaje');
    const email2 = document.querySelector('#email2');
    const formulario = document.querySelector('#formulario');

    const btnEnviar = document.querySelector('#botones button[type="submit"]');
    const btnReset = document.querySelector('#botones button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    email.addEventListener('input', validar);

    asunto.addEventListener('input', validar);

    mensaje.addEventListener('input', validar);

    email2.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', (e) => {
        e.preventDefault();
        objEmail.email = '';
        objEmail.asunto = '';
        objEmail.mensaje = '';

        comprobarObjEmail();
        formulario.reset();
    });

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetearFormulario();

            // crear una alerta 
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';  
            
            if (formulario.children.length < 6) {
                formulario.appendChild(alertaExito);
            }

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e) {

        if (e.target.id === 'email2' && !e.target.value.trim() !== '' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            // objEmail[e.target.name] = 'otro';
            return;
        }

        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
            objEmail[e.target.name] = '';
            comprobarObjEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            objEmail[e.target.name] = '';
            comprobarObjEmail();
            return;
        }
        
        limpiarAlerta(e.target.parentElement);

        // asignar los valores
        objEmail[e.target.name] = e.target.value.trim().toLowerCase();

        // comprobar el objeto de mail
        comprobarObjEmail();
    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2');
        // insertar el error al formulario
        // comprueba si ya existe una alerta
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');

        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarObjEmail() {
        if (Object.values(objEmail).includes('')) {
            btnEnviar.classList.add('opacity-50')
            btnEnviar.disabled = true;
            return;
        }
        btnEnviar.classList.remove('opacity-50')
        btnEnviar.disabled = false;
    }

    function resetearFormulario() {
        objEmail.email = '';
        objEmail.asunto = '';
        objEmail.mensaje = '';

        comprobarObjEmail();
        formulario.reset();
    }
});