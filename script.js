document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const usuario =
            document.getElementById("usuario").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const errorMsg =
            document.getElementById("errorMsg");


        /* COMPROBAR CAMPOS */

        if (usuario === "" || password === "") {

            errorMsg.style.display = "block";

            errorMsg.textContent =
                "⚠️ Completa todos los campos.";

            return;
        }


        /* INICIAR SESIÓN */

        window.location.href = "principal.html";

    });

});