window.addEventListener('DOMContentLoaded', (event) => {
    //Cuando el documento haya cargado entero ejecutara esto.
    let buttonForm = document.getElementById("button-login");

    buttonForm.addEventListener("click", (event) => {
        //realizar las comprobaciones
        event.preventDefault();
        //recoger datos de los inputs
        let userCache = document.getElementById("user").value;
        let passwordCache = document.getElementById("zipcode").value;


        if (validateFields(userCache, passwordCache)) {
            //tenemos que comprobar con la api si el resultado existe.
            login(userCache, passwordCache);
        }


    })


})

function validateFields(user, zipcode) {
    //funcion principal con todas las validaciones de campo.
    let confirmUser = validateUserField(user);
    let confirmPass = validateZipCodeField(zipcode);

    if (!confirmUser || !confirmPass) {
        return false;
    }

    return true;
}


function validateUserField(user) {
    let err = document.getElementById("error-user");

    if (user === "") {
        err.style.display = "block"
        err.style.color = "red"
        err.textContent = "Error, campo del usuario vacío.";
        return false;
    }
    err.style.display = "none";
    console.log("Usuario insertado correcto: " + user)
    return true;
}

function validateZipCodeField(zipcode) {
    console.log(zipcode)
    let err = document.getElementById("error-password");
    if (zipcode === "") {
        err.style.display = "block"
        err.style.color = "red"
        err.textContent = "Error, campo de contraseña vacío.";
        return false;
    }

    err.style.display = "none";
    console.log("Zipcode correcto")
    return true;
}

function login(user, zipcode) {
    let spanResult = document.getElementById("login-result");
    console.log("Usuario insertado: " + user);
    console.log("Zipcode insertado: " + zipcode);
    getData(user).then((data) => {

        if (data == zipcode) {
            printSuccess(spanResult);
        } else {
            printError(spanResult);

        }


    }).catch((error) => { console.log("No se han encontrado datos.") });

}

async function getData(user) {
    return fetch(`https://jsonplaceholder.typicode.com/users?username=${user}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json[0]['address']['zipcode'])
            return json[0]['address']['zipcode']
        })
        .catch((error) => {
            console.log("error")
        });

}


function checkZipcode(zipcodeValue) {
    let zipcodeCache = document.getElementById("zipcode").value;
    if (zipcodeValue != zipcodeCache) {
        return false
    }
    return true;
}



//FUNCIONES DE INTERFAZ DE USUARIO
function moveToPage(url) {
    window.open(url);
}

function printSuccess(span) {

    Swal.fire(
        'Login Correcto',
        'Ingresando a la tienda...',
        'success'
      )

    setTimeout(() => {
       
        moveToPage("/musica.html");
        window.close();
    }, 3000);

}
function printError(span) {

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algún dato está incorrecto!',
        footer: 'Por favor intentelo nuevamente'
      })
    
}