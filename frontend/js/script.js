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
                function (event) {

                    event.preventDefault();


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


                    message.textContent =
                        "Registration successful on frontend. Database connection will be added next.";

                }
            );

        }

    }
);