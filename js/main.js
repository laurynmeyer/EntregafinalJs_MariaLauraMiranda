let listaProductos = [
    { id: 1, marca: "Lenovo ", disco: "512 GB SSD", ram: "8GB RAM", procesador: "CORE I5-1135G7", precio: 237499, stock: 12, cantidad: 1, envio: 2000, img: "assets/img/notebook1.jpg" },
    { id: 2, marca: "Dell ", disco: "512 GB SSD", ram: "16GB RAM", procesador: "CORE I7-1135G7", precio: 437499, stock: 4, cantidad: 1, envio: 2000, img: "assets/img/notebook2.jpg" },
    { id: 3, marca: "HP ", disco: "256 GB SSD", ram: "16GB RAM", procesador: "CORE I3-1135G7", precio: 224499, stock: 9, cantidad: 1, envio: 2000, img: "assets/img/notebook3.jpg" },
    { id: 4, marca: "Lenovo", disco: "512 GB SSD", ram: "16GB RAM", procesador: "CORE I3-1135G7", precio: 384499, stock: 9, cantidad: 1, envio: 2000, img: "assets/img/notebook4.jpg" },
    { id: 5, marca: "Dell", disco: "256 GB SSD", ram: "8GB RAM", procesador: "CORE I3-1135G7", precio: 258499, stock: 8, cantidad: 1, envio: 2000, img: "assets/img/notebook5.jpg" },
    { id: 6, marca: "HP", disco: "256 GB SSD", ram: "8GB RAM", procesador: "CORE I5-1135G7", precio: 232499, stock: 7, cantidad: 1, envio: 2000, img: "assets/img/notebook6.jpg" },
    { id: 7, marca: "Lenovo", disco: "256 GB SSD", ram: "4GB RAM", procesador: "CORE I3-1135G7", precio: 137499, stock: 10, cantidad: 1, envio: 2000, img: "assets/img/notebook7.jpg" },
    { id: 8, marca: "Lenovo", disco: "512 GB SSD", ram: "16GB RAM", procesador: "CORE I5-1135G7", precio: 339499, stock: 17, cantidad: 1, envio: 2000, img: "assets/img/notebook8.jpg" },
    { id: 9, marca: "HP", disco: "512 GB SSD", ram: "4GB RAM", procesador: "CORE I3-1135G7", precio: 158499, stock: 5, cantidad: 1, envio: 2000, img: "assets/img/notebook9.jpg" }
]

const arrayJSON = JSON.stringify(listaProductos)
localStorage.setItem("listaProductos", arrayJSON)


class ProductoController {
    constructor() {
        this.listaProductos = []
    }
    leerProductos() {

        let obtenerListaJSON = localStorage.getItem("listaProductos")

        if (obtenerListaJSON) {
            this.listaProductos = JSON.parse(obtenerListaJSON)
        }
    }

    mostrarEnDOM(stock_productos) {
        stock_productos.innerHTML = ""
        this.listaProductos.forEach(producto => {
            stock_productos.innerHTML += `
            <div class="card bg-dark-subtle card_productos" style="width: 18rem;">
            <img src="${producto.img}" class= "card-img-top"alt="...">
            <div class="card-body">
              <h5 class="card-title">${producto.marca}</h5>
              <p class="card-text">${producto.disco}</p>
              <p class="card-text">${producto.ram} - ${producto.procesador} </p>
              <p class="card-text"></p>
              <p class="card-text"> Precio: $${producto.precio}</p>
              <a href="#" class=" btn btn-primary btn_color" id="idProducto${producto.id}">Añadir al carrito</a>
            </div>
          </div>
            `
        })
    }
}

const controladorProductos = new ProductoController()
controladorProductos.leerProductos()
const stock_productos = document.getElementById("stock_productos")
controladorProductos.mostrarEnDOM(stock_productos)


class CarritoController {
    constructor() {
        this.listaCarrito = []
    }

    eliminar(producto) {
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice, 1)
    }

    leerProductos() {
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if (obtenerListaJSON) {
            this.listaCarrito = JSON.parse(obtenerListaJSON)
        }
    }

    agregarProducto(producto) {
        this.listaCarrito.push(producto)
        let arrayJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", arrayJSON)
    }

    mostrarEnDOM(contenedor_carrito) {
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.marca}</h5>
                        <p class="card-text">${producto.disco} - ${producto.ram} </p> 
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <button class= "delete" id="eliminar${producto.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
            `
        })

        this.listaCarrito.forEach(producto => {
            document.getElementById(`eliminar${producto.id}`).addEventListener("click", () => {
                this.eliminar(producto)
                localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
                this.mostrarEnDOM(contenedor_carrito)
            })
        })
    }

    /**   mostrarPrecioEnDom(precio){
          precio.innerHTML = this.calcularTotal()
  
      }
  
      calcularTotal(){
          return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
      }**/

    limpiarCarrito() {
        this.listaCarrito = []
        localStorage.removeItem("listaCarrito")
    }
}

const controladorCarrito = new CarritoController()
controladorCarrito.leerProductos()
const contenedor_carrito = document.getElementById("contenedor_carrito")
controladorCarrito.mostrarEnDOM(contenedor_carrito)
const precio = document.getElementById("precio")

controladorCarrito.mostrarEnDOM(contenedor_carrito)

controladorProductos.listaProductos.forEach(producto => {
    const agregarProducto = document.getElementById(`idProducto${producto.id}`)

    agregarProducto.addEventListener("click", () => {

        controladorCarrito.agregarProducto(producto)
        controladorCarrito.leerProductos()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)
        Toastify({
            text: "Añadido al carrito",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();        
    })

    controladorCarrito.mostrarPrecioEnDom(precio)
})

const finalizar_compra = document.getElementById("finalizar_compra")
finalizar_compra.addEventListener("click", () => {
    if (controladorCarrito.listaCarrito.length > 0) {
        controladorCarrito.limpiarCarrito()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con éxito',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Aún no seleccionaste ningún producto',
        })
        
    }
})











