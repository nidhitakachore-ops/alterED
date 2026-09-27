/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const navMenu =
        document.querySelector(".nav-menu");

    if (navMenu) {

        navMenu.classList.toggle("show");

    }

}


/* =====================================================
   LOGIN FORM
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const loginForm =
            document.getElementById("loginForm");


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const email =
                        document.getElementById(
                            "loginEmail"
                        ).value;


                    const role =
                        document.getElementById(
                            "loginRole"
                        ).value;


                    const message =
                        document.getElementById(
                            "loginMessage"
                        );


                    message.textContent =
                        "Login submitted for " +
                        role +
                        ". Backend connection will be added next.";

                }
            );

        }



        /* =================================================
           REGISTER FORM
        ================================================= */


        const registerForm =
            document.getElementById("registerForm");


        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const name =
                        document.getElementById(
                            "registerName"
                        ).value;


                    const email =
                        document.getElementById(
                            "registerEmail"
                        ).value;


                    const role =
                        document.getElementById(
                            "registerRole"
                        ).value;


                    const password =
                        document.getElementById(
                            "registerPassword"
                        ).value;


                    const confirmPassword =
                        document.getElementById(
                            "confirmPassword"
                        ).value;


                    const message =
                        document.getElementById(
                            "registerMessage"
                        );


                    if (
                        password !==
                        confirmPassword
                    ) {

                        message.textContent =
                            "Passwords do not match.";

                        return;

                    }


                    try {

                        const response =
                            await fetch(
                                "http://localhost:5000/api/register",
                                {
                                    method: "POST",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    body: JSON.stringify({
                                        name,
                                        email,
                                        role,
                                        password
                                    })
                                }
                            );


                        const data =
                            await response.json();


                        message.textContent =
                            data.message;


                    } catch (error) {

                        message.textContent =
                            "Unable to connect to backend.";

                    }

                }
            );

        }

    }
);