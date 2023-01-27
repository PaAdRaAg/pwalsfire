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

// 1 Agregar tareas (a db)
//Habilitar / deshabilitar botón de agregar
input.addEventListener('keyup', () => {
    if(input.value.trim() !== 0){
        agBtn.classList.add('active');
    } else{
        agBtn.classList.remove('active');
    }
});

//Evento para enviar agregar tarea con tecla enter
input.addEventListener('keydown', e =>{
    if(e.keyCode === 13){
        if(input.value.trim() != 0){
            //Agregar a la base de datos
            let tarea = input.value;
            db.collection("Usuario").add({
                tarea: input.value,
                status: "activa",
                timestamp: firebase.firestore.Timestamp.fromDate(new Date())
            })
            .then((docRef) => {
                console.log("Adición exitosa || ID: " + docRef.id + " Tarea: " + tarea);
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
    }
    else{
        return;
    }
});

//Agregar tarea con botón
agBtn.addEventListener('click', function (){
    if(input.value.trim() != 0){
        //Agregar a la base de datos
        let tarea = input.value;
        db.collection("Usuario").add({
            tarea: input.value,
            status: "activa",
            timesamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((docRef) => {
            console.log("Adición exitosa || ID: " + docRef.id + " Tarea: " + tarea);
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
    }
    else{
        agBtn.classList.remove('active');
        alert("Ingrese alguna tarea para agregar.");
    }
    input.value = "";
});

// 3 Marcar como hechas (cambiar status en db)
function markDo(id){

    db.collection("Usuario").doc(id).update({
        status: "completed"
    })
    // item.get().then(function(doc) {
    //     if (doc.exists) {
    //         console.log("pasó 1")
    //         if(doc.data().status == "activa"){
    //             console.log("pasó 2")
    //             item.update({
    //                 status: "completed"
    //             })
    //         } else {
    //             item.update({
    //                 status: "activa"
    //             })
    //         }
    //     }
    // })

    // let item = db.collection("Usuario").doc(id);
    // item.get().then(function(doc) {
    //     if (doc.exists) {
    //         console.log("pasó 1")
    //         if(doc.data().status == "activa"){
    //             console.log("pasó 2")
    //             item.update({
    //                 status: "completed"
    //             })
    //         } else {
    //             item.update({
    //                 status: "activa"
    //             })
    //         }
    //     }
    // })
}

// .completed {
//     text-decoration: line-through;
// }

// .unCompleted {
//     text-decoration: none;
// }

// 4 Eliminar tarea (de db)
function deleteItem(){
    db.collection("Usuario").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}



// 2 Mostrar tareas (de db) (y actualizar ls en base a db)
// db.collection("citas_registradas").orderBy("fecha", "desc")
db.collection("Usuario").orderBy("timestamp", "asc").onSnapshot((querySnapshot) => {
    tareas.innerHTML = "";
    localStorage.clear();

    querySnapshot.forEach((doc) => {
        let localItems = JSON.parse(localStorage.getItem('localItem'));
        if(localItems === null){
            listareas = [];
        }
        else{
            listareas = localItems;
        }
        listareas.push(doc.data().tarea);
        console.log("Registro de tarea el ls exitoso");
        localStorage.setItem('localItem', JSON.stringify(listareas)); 

        tareas.innerHTML += `
        <div class="tarea">
            ${doc.data().tarea}
            <div class="nuevaTarea-btn">
                <i class="fa-solid fa-check nuevaTarea-btn-done" onclick="markDo(toString(doc.id))"></i>            
                <i class="fa-solid fa-xmark nuevaTarea-btn-delete" onclick="deleteItem(${doc.id})"></i>
            </div>
        </div>
        `
    });
});

