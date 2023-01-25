//Variables
let input = document.querySelector('.text-tareas');
let agBtn = document.querySelector('.btn-agregar-tarea');
let tareas = document.querySelector('.tareas');

//PWA offline
navigator.serviceWorker.register('./Service_Worker.js');

//Habilitar/deshabilitar botón de agregar
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
            let localItems = JSON.parse(localStorage.getItem('localItem'));
            if(localItems === null){
                listareas = [];
            }else{
                listareas = localItems;
            }
            listareas.push(input.value);
            guardarDB(input.value)
            localStorage.setItem('localItem', JSON.stringify(listareas)); 
        }else{
            agBtn.classList.remove('active');
            alert("Ingrese alguna tarea para agregar.");
        }
        showItem();
    }else{
        return;
    }
});

//Agregar tarea
agBtn.addEventListener('click', function (){
    if(input.value.trim()!=0){
           let localItems = JSON.parse(localStorage.getItem('localItem'));
            if(localItems === null){
                listareas = [];
        }else{
            listareas = localItems;
        }
        listareas.push(input.value);
        guardarDB(input.value)
        localStorage.setItem('localItem', JSON.stringify(listareas)); 
    }
    showItem();
});

//Mostrar tareas en el html como div
function showItem(){
    let localItems = JSON.parse( localStorage.getItem('localItem'));
    if(localItems === null){
        listareas = [];
    }else{
        listareas = localItems;
    }

    let html = '';
    let itemShow = document.querySelector('.tareas');
    listareas.forEach((data, index )=> {
    html += `
    <div class="tarea">
    ${data}
    <div class="nuevaTarea-btn">
    <i class="fa-solid fa-check nuevaTarea-btn-done" onclick="markDo(${index})"></i>            
    <i class="fa-solid fa-xmark nuevaTarea-btn-delete" onclick="deleteItem(${index})"></i>
    </div>
    </div>
    `;
    input.value = '';
    agBtn.classList.remove('active');
});
itemShow.innerHTML = html;
} 
showItem();

//Función de eliminar tarea
function deleteItem(index){
    //let localItems = JSON.parse(localStorage.getItem('localItem'));
    listareas.splice(index, 1);
    localStorage.setItem('localItem', JSON.stringify(listareas));
    showItem();
}

//Función de marcar tarea como hecha
function markDo(index) {
    if (listareas[index].includes('<strike>')){
        listareas[index] = listareas[index].replace('<strike>', "");
    } else {
        listareas[index] = '<strike>' + listareas[index] + '</strike>';
    }
    if (localStorage.getItem('localItem') == null){
      localStorage.setItem('localItem', JSON.stringify(listareas));
    } else {
      localStorage.setItem('localItem', JSON.stringify(listareas));
    }
    showItem();
}

//Función limpiar todas las tareas de ls
function limpiar(){
    localStorage.clear();
    showItem();
}

//Guardar en DB
function guardarDB(tar){
    db.collection("Usuario").add({
        tarea: tar
    })
    .then((docRef) => {
        console.log("Registro de tarea exitoso con el ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

//Elimidar de DB
function eliminarDB(){

db.collection("cities").doc("DC").delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});

}

// db.collection("cities").doc("DC").delete().then(() => {
//     console.log("Document successfully deleted!");
// }).catch((error) => {
//     console.error("Error removing document: ", error);
// });

// db.collection("cities").document("DC").delete() { err in
//     if let err = err {
//         print("Error removing document: \(err)")
//     } else {
//         print("Document successfully removed!")
//     }
// }