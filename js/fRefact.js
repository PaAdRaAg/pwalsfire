//PWA offline
navigator.serviceWorker.register('./Service_Worker.js');

//Firestore
const firebaseConfig = {
    apiKey: "AIzaSyC_XTRFO7FbvTqpd_6twCBZW4zE_TGqBKo",
    authDomain: "pwalsbd.firebaseapp.com",
    projectId: "pwalsbd",
    storageBucket: "pwalsbd.appspot.com",
    messagingSenderId: "383889818250",
    appId: "1:383889818250:web:0e188d192a32a8c646e373",
    measurementId: "G-4T9PQFZSY8"};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

//Variables
let input = document.querySelector('.text-tareas');
let agBtn = document.querySelector('.btn-agregar-tarea');
let tareas = document.querySelector('.tareas');

// 2 Mostrar tareas (de db) (y actualizar ls en base a db)

// 1 Agregar tareas (a db)
//Evento para enviar agregar tarea con tecla enter
input.addEventListener('keydown', e =>{
    if(e.keyCode === 13){
        if(input.value.trim() != 0){
            //Agregar a la base de datos
            db.collection("Usuario").add({
                tarea: input.value,
                status: "active"
            })
            .then((docRef) => {
                console.log("Registro de tarea exitoso con el ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
        }
        else{
            agBtn.classList.remove('active');
            alert("Ingrese alguna tarea para agregar.");
        }
        input.value = ""
        // Mostrar tareas();
    }
    else{
        return;
    }
});

// 3 Marcar como hechas (cambiar status en db)

// 4 Eliminar tarea (de db)

