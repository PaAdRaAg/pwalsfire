# Lista de tareas con firestore

Esta es una lista de tareas conectada a una base de datos donde las almacena y las recupera.

**Dependencias requeridaas**

powershell

npm i firebase-tools

Para ejecutar este comando debes estar en el cmd y estar situado en el directorio raíz donde la vas a ejecutar.

Ejemplo:
C:\Users\tu-usuario\ruta-de-la-carpeta>npm i firebase-tools

![Image text](./imgs-readme/firebasecmd.PNG)



HTML
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

Ejemplo:
![Image text](./imgs-readme/firebasesrc.PNG)

Debes agregar estos scripts cuya función es conectarse primeramente a firebase que es lo que se está utilizando como 
medio para hostear y el siguiente es para conectarse a la base de datos de firebase, es decir, firestore.

JS

const firebaseConfig = {
    
    apiKey: "AIzaSyC_XTRFO7FbvTqpd_6twCBZW4zE_TGqBKo",

    authDomain: "pwalsbd.firebaseapp.com",

    projectId: "pwalsbd",

    storageBucket: "pwalsbd.appspot.com",

    messagingSenderId: "383889818250",

    appId: "1:383889818250:web:0e188d192a32a8c646e373",

    measurementId: "G-4T9PQFZSY8"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

Ejemplo:
![Image text](./imgs-readme/firestorecnc.PNG)


Esto se debe de colocar al principio del archivo de js para que se pueda establecer la conexión con la base de datos.

El "firebaseconfig" es un SDK que contiene la api para conectarse a nuestra base de datos específica.

El siguiente comando es para que inicialice la aplicación y se establezca la conexión.

Y la tercera que se guarda como una constante, es para que la puedas referenciar para leer, eliminar y modificar los datos
de firestore.