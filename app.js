// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo
function agregarAmigo() {
    const inputNombre = document.getElementById('nombreAmigo');
    const nombre = inputNombre.value.trim();

    // Validar que el campo no esté vacío
    if (nombre === '') {
        alert('Por favor, inserta un nombre.');
        inputNombre.focus();
        return;
    }

    // Validar que el nombre no esté repetido, ignorando mayúsculas y minúsculas
    if (amigos.some(amigo => amigo.toUpperCase() === nombre.toUpperCase())) {
        alert('Este nombre ya está en la lista. Ingresa uno diferente.');
        inputNombre.value = '';
        inputNombre.focus();
        return;
    }

    // Añadir el nombre al array (almacenado en mayúsculas para uniformidad)
    amigos.push(nombre.toUpperCase());
    inputNombre.value = '';
    inputNombre.focus();
    actualizarListaAmigos();
}

// Función para actualizar la lista de amigos en el DOM
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpiar contenido previo

    amigos.forEach((amigo) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        li.setAttribute('role', 'listitem');
        listaAmigos.appendChild(li);
    });
}

// Función para sortear un solo amigo secreto
function sortearAmigo() {
    if (amigos.length === 0) {
        alert('No hay amigos para sortear.');
        return;
    }

    if (amigos.length < 2) {
        alert('Se necesitan al menos 2 amigos para realizar el sorteo.');
        return;
    }

    // Seleccionar un amigo aleatorio como ganador
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoGanador = amigos[indiceAleatorio];

    // Mostrar el ganador en el modal
    mostrarGanador(amigoGanador);
}

// Función para mostrar el nombre del ganador en un modal
function mostrarGanador(amigoGanador) {
    const modal = document.getElementById('modal');
    const resultadoModal = document.getElementById('resultadoModal');
    const cerrarModal = document.getElementById('cerrarModal');

    // Mostrar solo el nombre del ganador
    resultadoModal.innerHTML = `<p>El amigo secreto es: <strong>${amigoGanador}</strong></p>`;

    modal.style.display = 'block'; // Mostrar el modal

    // Evento para cerrar el modal al hacer clic en la "X"
    cerrarModal.onclick = () => {
        modal.style.display = 'none';
    };

    // Evento para cerrar el modal al hacer clic fuera de él
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Función para reiniciar el sorteo
function reiniciarSorteo() {
    amigos = []; // Reiniciar la lista de amigos
    actualizarListaAmigos(); // Actualizar el DOM
    const resultadoModal = document.getElementById('resultadoModal');
    if (resultadoModal) resultadoModal.innerHTML = ''; // Limpiar el modal
    alert('El sorteo se ha reiniciado.');
}
