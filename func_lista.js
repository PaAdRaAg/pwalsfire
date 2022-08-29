let input = document.querySelector('.text-tareas');
let agBtn = document.querySelector('.btn-agregar-tarea');
let tareas = document.querySelector('.tareas')

/*
//activar boton de agragar después de ingresar algún valor a la caja de texto
input.addEventListener('keyup', () => {
    if(input.value.trim() !== 0){
        agBtn.classList.add('active');
    } else{
        agBtn.classList.remove('active');
    };
});

//agregar nueva tarea a la lista
agBtn.addEventListener('click', () =>{
    if(input.value.trim() != 0){
        let nuevaTarea = document.createElement('div');
        nuevaTarea.classList.add('tarea');
        nuevaTarea.innerHTML = `
        <p> ${input.value} </p>
        <div class="nuevaTarea-btn">
        <i class="fa-solid fa-check nuevaTarea-btn-done"></i>            
        <i class="fa-solid fa-xmark nuevaTarea-btn-delete"></i>
        </div>
        `
        tareas.appendChild(nuevaTarea);
        input.value = '';
        agBtn.classList.remove('active');
    } else{
        alert("Por favor ingrese una tarea")
    };
});

//eliminar tareas
tareas.addEventListener('click', (e) =>{
    if(e.target.classList.contains('fa-xmark')){
        e.target.parentElement.parentElement.remove();
    };
});

//marcar tareas completadas
tareas.addEventListener('click', (e) =>{
    if(e.target.classList.contains('fa-check')){
        e.target.parentElement.parentElement.classList.toggle('completada');
    };
});
*/
/*----------------------------------------------------------------------------------------*/
input.addEventListener('keyup', () => {
    if(input.value.trim() !== 0){
        agBtn.classList.add('active');
    } else{
        agBtn.classList.remove('active');
    };
});

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
    <p> ${data} </p>
    <div class="nuevaTarea-btn">
    <i class="fa-solid fa-check nuevaTarea-btn-done" onClick= "markDo(${index}")></i>            
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

function deleteItem(index){
    let localItems = JSON.parse(localStorage.getItem('localItem'));
    listareas.splice(index, 1);
    localStorage.setItem('localItem', JSON.stringify(listareas));
    showItem();
};

function markDo(index){
    let localItems = JSON.parse(localStorage.getItem('localItem'));

    index.parentElement.parentElement.classList.toggle('completada');

    localStorage.setItem('localItem', JSON.stringify(listareas));
    showItem();
};
/*
tarea.addEventListener('click', (e) =>{
    if(e.target.classList.contains('fa-check')){
        e.target.parentElement.parentElement.classList.toggle('completada');
    };
});*/

