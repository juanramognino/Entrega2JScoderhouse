
// carrito de compras actualizado de la entrega anterior, agregar html y css.
//7/6
//event listenners 
// dt
//9/6
//dt
//dt
//10/6
//finalizado

// Función para redondear números
function round(numero, decimales = 3) {
    const factor = Math.pow(10, decimales);
    return Math.round(numero * factor) / factor;
}


function Pelicula(titulo, genero, año, edad, precio, alquiler = false, costoAlquilerPorDia = 0, duracionAlquiler = 0) {
    this.titulo = titulo;
    this.genero = genero;
    this.año = año;
    this.edad = edad;
    this.precio = precio;
    this.alquiler = alquiler;
    this.costoAlquilerPorDia = costoAlquilerPorDia;
    this.duracionAlquiler = duracionAlquiler;
}


let pelicula1 = new Pelicula("Avengers: Infinity War", "Acción", "2018", "+18", 1200);
let pelicula2 = new Pelicula("El Sexto Sentido", "Suspenso", "2002", "+18", 1300);
let pelicula3 = new Pelicula("Titanic", "Romance", "1997", "ATP", 1150);
let pelicula4 = new Pelicula("Thor", "Acción", "2011", "ATP", 1200);
let pelicula5 = new Pelicula("La La Land", "Romance", "2016", "ATP", 3150);
let pelicula6 = new Pelicula("El Conjuro", "Terror", "2013", "+21", 200, true, 50, 7);

// Array que contiene todas las películas
let items = [pelicula1, pelicula2, pelicula3, pelicula4, pelicula5, pelicula6];

// Tasas de interés para cuotas
let InteresCuotas = {
    3: 5,
    6: 8
};

// Variables
let total = 0;
let carrito = [];

// Agregar event listeners a los botones, sirve para asignar funciones que se ejecutarán cuando un botón específico sea clicado
document.getElementById('comprar').addEventListener('click', () => mostrarPeliculas(false));
document.getElementById('alquilar').addEventListener('click', () => mostrarPeliculas(true));
document.getElementById('verCarrito').addEventListener('click', mostrarCarrito);
document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);
document.getElementById('pagoEfectivo').addEventListener('click', pagarEfectivo);
document.getElementById('pagoCuotas').addEventListener('click', mostrarCuotas);
document.getElementById('calcularCuotas').addEventListener('click', calcularCuotas);

//mostrar las peliculas
function mostrarPeliculas(alquiler) {
    const peliculasDisponibles = document.getElementById('peliculasDisponibles');
    const listaPeliculas = document.getElementById('listaPeliculas');
    peliculasDisponibles.classList.remove('hidden');
    listaPeliculas.innerHTML = '';

    for (let i = 0; i < items.length; i++) {
        if ((alquiler && items[i].alquiler) || !alquiler) {
            const li = document.createElement('li');
            li.textContent = `${i + 1}: ${items[i].titulo} - ${items[i].genero} (${items[i].año}) - ${alquiler ? items[i].costoAlquilerPorDia + ' pesos por día' : items[i].precio + ' pesos'}`;
            li.dataset.index = i;
            listaPeliculas.appendChild(li);
        }
    }

    listaPeliculas.addEventListener('click', (event) => {
        const li = event.target;
        if (li.tagName === 'LI') {
            const index = parseInt(li.dataset.index);
            seleccionarPelicula(index, alquiler);
        }
    });
}

// seleccionar película
function seleccionarPelicula(index, alquiler) {
    if (alquiler) {
        let diasAlquiler = parseInt(prompt('Ingrese la cantidad de días de alquiler:'));
        total += items[index].costoAlquilerPorDia * diasAlquiler;
    } else {
        total += items[index].precio;
    }
    carrito.push(items[index]);
    alert(`${items[index].titulo} ha sido agregado al carrito.`);
}

//mostrar el carrito
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    carritoDiv.classList.remove('hidden');
    listaCarrito.innerHTML = '';

    for (let i = 0; i < carrito.length; i++) {
        const li = document.createElement('li');
        li.textContent = `${carrito[i].titulo} - ${carrito[i].genero} (${carrito[i].año}) - ${carrito[i].precio} pesos`;
        listaCarrito.appendChild(li);
    }
    totalCarrito.textContent = total;
}

// finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("No puede finalizar la compra sin haber seleccionado algo.");
        return;
    }

    const finalizarDiv = document.getElementById('finalizar');
    const totalFinalizar = document.getElementById('totalFinalizar');
    finalizarDiv.classList.remove('hidden');
    totalFinalizar.textContent = total;
}

// efectivo
function pagarEfectivo() {
    alert(`El total de su compra es de ${total} pesos. ¡Gracias por su compra!`);
    resetearCompra();
}

//cuotas
function mostrarCuotas() {
    document.getElementById('cuotas').classList.remove('hidden');
}

//calcular las cuotas
function calcularCuotas() {
    const cuotas = parseInt(document.getElementById('cantidadCuotas').value);
    const totalInteres = round(total * (1 + (InteresCuotas[cuotas] / 100)), 2);
    const valorCuota = round(totalInteres / cuotas, 2);

    document.getElementById('totalInteres').textContent = totalInteres;
    document.getElementById('valorCuota').textContent = valorCuota;

    document.getElementById('resultadoCuotas').classList.remove('hidden');
}

//borrar y resetear la compra la compra
function resetearCompra() {
    total = 0;
    carrito = [];
    document.getElementById('listaCarrito').innerHTML = '';
    document.getElementById('totalCarrito').textContent = '';
    document.getElementById('totalFinalizar').textContent = '';
    document.getElementById('totalInteres').textContent = '';
    document.getElementById('valorCuota').textContent = '';
    document.getElementById('peliculasDisponibles').classList.add('hidden');
    document.getElementById('carrito').classList.add('hidden');
    document.getElementById('finalizar').classList.add('hidden');
    document.getElementById('cuotas').classList.add('hidden');
    document.getElementById('resultadoCuotas').classList.add('hidden');
}