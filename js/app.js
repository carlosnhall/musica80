// Array de Productos

const productos = [
    {
        id: "album01",
        artista: "Dire Straits",
        nombre: "Brothers in Arms",
        imagen: "./img/001.jpg",
        precio: 350
    },
    {
        id: "album02",
        artista: "U2",
        nombre: "The Joshua Tree",
        imagen: "./img/002.jpg",
        precio: 450
    },
    {
        id: "album03",
        artista: "The Police",
        nombre: "Synchronicity",
        imagen: "./img/003.jpg",
        precio: 400
    },
    {
        id: "album04",
        artista: "Prince",
        nombre: "Purple Rain",
        imagen: "./img/004.jpg",
        precio: 375
    },
    {
        id: "album05",
        artista: "The Rollings Stones",
        nombre: "Tatoo You",
        imagen: "./img/005.jpg",
        precio: 425
    },
    {
        id: "album06",
        artista: "Michael Jackson",
        nombre: "Thriller",
        imagen: "./img/006.jpg",
        precio: 375
    },
    {
        id: "album07",
        artista: "Roxette",
        nombre: "Look Sharp!",
        imagen: "./img/007.jpg",
        precio: 485
    },
    {
        id: "album08",
        artista: "Whitney",
        nombre: "Whitney Houston",
        imagen: "./img/008.jpg",
        precio: 540
    }
];

let productosEnCarrito = [];
const contenedorAlbum = document.querySelector("#contenedor-albums");
const contadorCarrito = document.querySelector("#contador-carrito");
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

function mostrarProductos() {
    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.classList.add("col-lg-3");
        div.innerHTML = `
            <div class="card shadow card-album">
                <img src="${producto.imagen}" class="card-img-top img-album" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title titulo-album">${producto.artista}</h5>
                    <h5 class="card-title titulo-album">${producto.nombre}</h5>
                    <p class="precio-album">$${producto.precio}</p>
                    <button class="btn-card boton-agregar-album" id="${producto.id}"><span>Agregar</span></button>
                </div>
            </div>
        `;

        contenedorAlbum.append(div);
    });
};

function agregarProdAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregar = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const i = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[i].cantidad++;

    } else {
        productoAgregar.cantidad = 1;
        productosEnCarrito.push(productoAgregar);
    }

    actualizarContadorCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarContadorCarrito() {
    let contador = productosEnCarrito.reduce((acu, producto) => acu + producto.cantidad, 0);
    contadorCarrito.innerHTML = contador;
};


mostrarProductos();
const botonesAgregar = document.querySelectorAll(".boton-agregar-album");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarContadorCarrito();
} else {
    productosEnCarrito = [];
}

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarProdAlCarrito);
});



