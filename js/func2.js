function getItems(){
    db.collection("Usuario").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            });
        });
        generateItems(items);
    });
};

function generateItems(items){
    let todoItems = [];
    items.forEach((item) => {
        tabladb.innerHTML += `
        <div class="tarea">
            ${doc.data().tarea}
            <div class="nuevaTarea-btn">
                <i class="fa-solid fa-check nuevaTarea-btn-done" id="check"></i>            
                <i class="fa-solid fa-xmark nuevaTarea-btn-delete" id="delete"></i>
            </div>
        </div>
        `
        let checkMark = document.getElementById("chek");
        checkMark.addEventListener("click", function(){
            markCompleted(tarea.id);
        });
        checkContainer.appendChild(checkMark);

        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
        };
        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem);
    });
    document.querySelector(".Usuario").replaceChildren(...todoItems);
};



function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("Usuario").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function markCompleted(id){
    let item = db.collection("Usuario").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

getItems();
