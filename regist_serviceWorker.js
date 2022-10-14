/*if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./Service_Worker.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err));
}

window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./Service_Worker.js');
      console.log('Registro de SW exitoso');
    } catch (err) {
      console.log('Registro de SW Fallido', err);
    }
    }
});
*/

window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./Service_Worker.js')
      .then(reg => console.log('Registro de SW exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw', err));
    }
});