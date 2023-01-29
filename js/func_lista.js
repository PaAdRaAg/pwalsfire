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

//Habilitar/deshabilitar botón de agregar
input.addEventListener('keyup', () => {
    if(input.value.trim() !== 0){
        agBtn.classList.add('active');
    } 
    else{
        agBtn.classList.remove('active');
    }
});

function lsTODB(){

}

//Evento para enviar agregar tarea con tecla enter
input.addEventListener('keydown', e =>{
    if(e.keyCode === 13){
        if(input.value.trim() != 0){
            let localItems = JSON.parse( localStorage.getItem('localItem'));
            if(localItems === null){
                listareas = [];
            }
            else{
                listareas = localItems;
            }
            //A la base de datos
            db.collection("Usuario").add({
                tarea: input.value
            })
            .then((docRef) => {
                console.log("Registro de tarea exitoso con el ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            
            listareas.push(input.value);
            console.log("Registro de tarea el ls exitoso");
            localStorage.setItem('localItem', JSON.stringify(listareas)); 
        }
        else{
            agBtn.classList.remove('active');
            alert("Ingrese alguna tarea para agregar.");
        }
        input.value = ""
        // showItem();
    }
    else{
        return;
    }
});



// if(e.keyCode === 13){
//     if(input.value.trim() != 0){
//         let localItems = JSON.parse(localStorage.getItem('localItem'));
//         if(localItems === null){
//             listareas = [];
//         }
//         else{
//             listareas = localItems;
//         }
//         //A la base de datos
//         db.collection("Usuario").add({
//             tarea: input.value
//         })
//         .then((docRef) => {
//             console.log("Registro de tarea exitoso con el ID: ", docRef.id);
//         })
//         .catch((error) => {
//             console.error("Error adding document: ", error);
//         });
        
//         listareas.push(input.value);
//         console.log("Registro de tarea el ls exitoso");
//         localStorage.setItem('localItem', JSON.stringify(listareas)); 
//     }
//     else{
//         agBtn.classList.remove('active');
//         alert("Ingrese alguna tarea para agregar.");
//     }
//     input.value = ""
    // showItem();
// }
// else{
//     return;
// }

//Agregar tarea
agBtn.addEventListener('click', function (){
    if(input.value.trim() != 0){
        let localItems = JSON.parse(localStorage.getItem('localItem'));
        if(localItems === null){
            listareas = [];
        }
        else{
            listareas = localItems;
        }
        //A la base de datos
        db.collection("Usuario").add({
            tarea: input.value
        })
        .then((docRef) => {
            console.log("Registro de tarea exitoso con el ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
        listareas.push(input.value);
        console.log("Registro de tarea el ls exitoso");
        localStorage.setItem('localItem', JSON.stringify(listareas)); 
    }
    else{
        agBtn.classList.remove('active');
        alert("Ingrese alguna tarea para agregar.");
    }
    input.value = ""
    // showItem();
});

//Mostrar las tareas a partir de la DB
let tabladb = document.querySelector('.tareasDB');
db.collection("Usuario").onSnapshot((querySnapshot) => {
    tabladb.innerHTML = "";
    querySnapshot.forEach((doc) => {
        tabladb.innerHTML += `
        <div class="tarea">
            ${doc.data().tarea}
            <div class="nuevaTarea-btn">
                <i class="fa-solid fa-check nuevaTarea-btn-done" onclick="markDo(${doc.id})"></i>            
                <i class="fa-solid fa-xmark nuevaTarea-btn-delete" onclick="deleteItem(${doc.id})"></i>
            </div>
        </div>
        `
    });
});

//Función de eliminar tarea
function deleteItem(index){
    //let localItems = JSON.parse(localStorage.getItem('localItem'));
    listareas.splice(index, 1);
    localStorage.setItem('localItem', JSON.stringify(listareas));
    // showItem();
}

//Función de marcar tarea como hecha
function markDo(index) {
    if (listareas[index].includes('<strike>')){
        listareas[index] = listareas[index].replace('<strike>', "");
    } 
    else {
        listareas[index] = '<strike>' + listareas[index] + '</strike>';
    }
    if (localStorage.getItem('localItem') == null){
      localStorage.setItem('localItem', JSON.stringify(listareas));
    } 
    else {
      localStorage.setItem('localItem', JSON.stringify(listareas));
    }
    // showItem();
}

//Función limpiar todas las tareas de ls
function limpiar(){
    localStorage.clear();
    // showItem();
}

//Elimidar de DB
function eliminarDB(id){

db.collection("Usuario").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}

/*------------------------------------------*/