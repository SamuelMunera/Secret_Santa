let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    const listaAmigos = document.getElementById("listaAmigos");
    
    
  if (nombre === "") {
        alert("Por favor, ingresa un nombre.");
        return;
    }
    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }
    
    amigos.push(nombre);
    const li = document.createElement("li");
    li.textContent = nombre;
    listaAmigos.appendChild(li);
    
    input.value = "";
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Deben haber al menos dos participantes para sortear.");
        return;
    }
    
    let asignaciones = new Map();
    let participantes = [...amigos];
    let sorteados = [...amigos];
    
    for (let participante of participantes) {
        let posibles = sorteados.filter(p => p !== participante);
        
        if (posibles.length === 0) {
            return sortearAmigo(); // Reintentar si se llega a un punto sin opciones
        }
        
        let seleccionado = posibles[Math.floor(Math.random() * posibles.length)];
        asignaciones.set(participante, seleccionado);
        
        sorteados = sorteados.filter(p => p !== seleccionado);
    }
    
    mostrarResultado(asignaciones);
}

function mostrarResultado(asignaciones) {
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";
    
    asignaciones.forEach((amigoSecreto, participante) => {
        const li = document.createElement("li");
        li.textContent = `${participante} → ${amigoSecreto}`;
        resultadoLista.appendChild(li);
    });
}
