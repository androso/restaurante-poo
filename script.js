// Clase base para productos
class Producto {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Clase para comida, hereda de Producto
class Comida extends Producto {
    constructor(name, price, tiempoEstimadoSeg) {
        super(name, price);
        this.tiempoEstimadoSegundos = tiempoEstimadoSeg ?? 0;
    }
}

// Clase para bebidas, hereda de Producto
class Bebida extends Producto { }

// Clase para gestionar los pedidos
class Pedido {
    constructor(producto, cantidad, apellido, estadoInicial) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.apellido = apellido;
        this.estado = estadoInicial ? estadoInicial : "En cocina";
    }

    getTotal() {
        return this.producto.price * this.cantidad;
    }

    setEstado(estado) {
        this.estado = estado;
    }
}

// Clase para gestionar la cocina
class Cocina {
    constructor() {
        this.pedidos = [];
    }

    agregarPedido(pedido) {
        this.pedidos.push(pedido);
    }

    actualizarEstado() {
        const orderStatus = document.getElementById("orderStatus");
        orderStatus.innerHTML = "";
        this.pedidos.forEach(pedido => {
            const row = orderStatus.insertRow();
            row.insertCell(0).innerHTML = pedido.producto.name;
            row.insertCell(1).innerHTML = pedido.cantidad;
            row.insertCell(2).innerHTML = pedido.estado;
            if (pedido.estado === "En cocina") {
                setTimeout(() => {
                    pedido.setEstado("Listo");
                    this.actualizarEstado();
                }, pedido.producto.tiempoEstimadoSegundos * 1000);
            }
        });
        console.log("dentro de actualizar estado")
    }
}

// Inicializar la cocina
const cocina = new Cocina();

// Crear instancias de los elementos del menú
const menuItems = [
    new Comida("Tacos de Birria", 8, 10),
    new Comida("Hamburguesas con Papas", 10, 12),
    new Comida("Nachos", 5, 8),
    new Bebida("Coca-cola", 0.75),
    new Bebida("Pepsi", 0.75),
    new Bebida("Fanta", 0.50),
    new Bebida("7up", 0.50)
];

// Calcular el total del pedido
function calcularTotal() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const nombreBebida = document.getElementById("nombreBebida").value;
    const cantidadBebida = parseInt(document.getElementById("cantidadBebida").value);

    let total = 0;

    // Buscar el producto seleccionado y sumar su precio al total
    const selectedMenuItem = menuItems.find(item => item.name === nombreProducto);
    if (selectedMenuItem) {
        total += selectedMenuItem.price * cantidad;
    }

    // Sumar el precio de la bebida al total
    const selectedDrink = menuItems.find(item => item.name === nombreBebida);
    if (selectedDrink) {
        total += selectedDrink.price * cantidadBebida
    }

    // Mostrar el total en la interfaz
    document.getElementById("totalProducto").textContent = total;
}

// Realizar pedido desde la interfaz de usuario
function realizarPedido() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const selectedMenuItem = menuItems.find(item => item.name === nombreProducto);
    const apellido = document.getElementById("apellido").value;
    const pedido = new Pedido(selectedMenuItem, cantidad, apellido);
    const nombreBebida = document.getElementById("nombreBebida").value;
    const cantidadBebida = parseInt(document.getElementById("cantidadBebida").value);
    const selectedDrink = menuItems.find(item => item.name === nombreBebida);
    const pedidoBebida = new Pedido(selectedDrink, cantidadBebida, apellido);
    const $apellidoOrden = document.getElementById("apellidoOrden");

    cocina.agregarPedido(pedido);
    cocina.agregarPedido(pedidoBebida);
    $apellidoOrden.textContent = `Orden para: ${apellido}`;
    cocina.actualizarEstado();
}

