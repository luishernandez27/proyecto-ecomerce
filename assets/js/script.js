let carrito = [];

// Añadir producto al carrito
function añadirAlCarrito(id, nombre, precio) {
    console.log(`Añadiendo producto: ID=${id}, Nombre=${nombre}, Precio=${precio}`);
    const productoExistente = carrito.find((producto) => producto.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    console.log(`Eliminando producto con ID=${id}`);
    carrito = carrito.filter((producto) => producto.id !== id);
    actualizarCarrito();
}

// Calcular el total del carrito
function calcularTotal() {
    const total = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    console.log(`Total del carrito: $${total}`);
    return total;
}

// Actualizar el carrito en la página
function actualizarCarrito() {
    const carritoContainer = document.querySelector(".carrito");
    const totalPrecio = document.getElementById("total-precio");

    if (carritoContainer) {
        carritoContainer.innerHTML = "";

        carrito.forEach((producto) => {
            carritoContainer.innerHTML += `
                <div class="producto-carrito">
                    <h2>${producto.nombre}</h2>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Precio total: $${producto.precio * producto.cantidad}</p>
                    <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                </div>
            `;
        });

        if (carrito.length === 0) {
            carritoContainer.innerHTML = "<p>El carrito está vacío</p>";
        }
    }

    if (totalPrecio) {
        totalPrecio.textContent = calcularTotal();
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Carrito guardado en localStorage:", JSON.stringify(carrito));
}

// Vaciar el carrito
function vaciarCarrito() {
    console.log("Vaciando el carrito...");
    carrito = [];
    actualizarCarrito();
}

// Cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        console.log("Carrito cargado desde localStorage:", carrito);
    }
}

// Inicializar eventos
document.addEventListener("DOMContentLoaded", () => {
    console.log("Inicializando eventos...");
    cargarCarrito(); // Llama correctamente a la función cargarCarrito
    actualizarCarrito();

    const btnVaciar = document.getElementById("vaciar-carrito");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", vaciarCarrito);
    }

    const botones = document.querySelectorAll(".btn-añadir");
    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const nombre = btn.dataset.nombre;
            const precio = parseFloat(btn.dataset.precio);
            añadirAlCarrito(id, nombre, precio);
        });
    });
});