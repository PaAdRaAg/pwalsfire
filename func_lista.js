//Variables
let input = document.querySelector('.text-tareas');
let agBtn = document.querySelector('.btn-agregar-tarea');
let tareas = document.querySelector('.tareas')

//Habilitar/deshabilitar botón de agregar
input.addEventListener('keyup', () => {
    if(input.value.trim() !== 0){
        agBtn.classList.add('active');
    } else{
        agBtn.classList.remove('active');
    };
});

//Agregar tarea
agBtn.addEventListener('click', function (){
    if(input.value.trim()!=0){
           let localItems = JSON.parse(localStorage.getItem('localItem'))
            if(localItems === null){
                listareas = [];
        }else{
            listareas = localItems;
        };
        listareas.push(input.value);
        localStorage.setItem('localItem', JSON.stringify(listareas)); 
    };
    showItem();
});

//Mostrar tareas en el html como div
function showItem(){
    let localItems = JSON.parse( localStorage.getItem('localItem'));
    if(localItems === null){
        listareas = [];
    }else{
        listareas = localItems;
    };

    let html = '';
    let itemShow = document.querySelector('.tareas');
    listareas.forEach((data, index )=> {
    html += `
    <div class="tarea">
    ${data}
    <div class="nuevaTarea-btn">
    <i class="fa-solid fa-check nuevaTarea-btn-done" onClick="markDo(${index})"></i>            
    <i class="fa-solid fa-xmark nuevaTarea-btn-delete" onClick="deleteItem(${index})"></i>
    </div>
    </div>
    `
    input.value = '';
    agBtn.classList.remove('active');
});
itemShow.innerHTML = html;
}; 
showItem();

//Función de eliminar tarea
function deleteItem(index){
    let localItems = JSON.parse(localStorage.getItem('localItem'));
    listareas.splice(index, 1);
    localStorage.setItem('localItem', JSON.stringify(listareas));
    showItem();
};

//Función de marcar tarea como hecha
function markDo(index) {
    if (listareas[index].includes('<strike>')){
        listareas[index] = listareas[index].replace('<strike>', "");
    } else {
        listareas[index] = '<strike>' + listareas[index] + '</strike>';
    };
    if (localStorage.getItem('localItem') == null){
      localStorage.setItem('localItem', JSON.stringify(listareas));
    } else {
      localStorage.setItem('localItem', JSON.stringify(listareas));
    };
    showItem();
};