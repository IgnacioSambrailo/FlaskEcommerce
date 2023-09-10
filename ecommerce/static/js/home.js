
function mostrarDetallesProducto(id, nombre, descripcion,img, precio) {
    // Llena el modal con la información del producto
    document.getElementById('modal-id').innerText = id;
    document.getElementById('modal-img').src = img;
    document.getElementById('modal-title').innerText = nombre;
    document.getElementById('modal-description').innerText = 'Descripción: ' + descripcion;
    document.getElementById('modal-price').innerText = 'Precio: $' + precio;
    
    // Abre el modal
    $('#productoModal').modal('show');
}

function mostrarCarrito() {
    // Llena el modal con la información del producto

    const advertenciaCarrito = $('#advertencia-carrito');
    const bodyCarrito = $('.modal-body-carrito')[0];

    fetch('/cart', {
        method:'get'
    })
    .then(response => {
        return response.text()
    })
    .then(html => {
        if (html != 0){
            advertenciaCarrito.remove()
            bodyCarrito.innerHTML=html;
        }
    })
    // Abre el modal
    $('#modalCart').modal('show');
}

function actualizarCantidadItemsCarrito(){

    let cantidad_items_carrito = $(".item_cart_number")[0]

    fetch(`/number-cart-items`, {
        method: "get"
    })
    .then(response => {
        return response.text()
    })
    .then(cantidad=>{
        if (cantidad == 0) {
            cantidad_items_carrito.innerHTML = ``
        }
        else{
            cantidad_items_carrito.innerHTML = `(${cantidad})`
        } 
    })
}

toastr.options = {
    "debug": false,
    "positionClass": "toast-bottom-right",
    "newestOnTop": false,
    "onclick": null,
    "fadeIn": 300,
    "fadeOut": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000
  }
  
window.onload = function() {
    const cantidadForm = document.getElementById("cantidad-form");
    cantidadForm.onsubmit = function(event) {
        event.preventDefault();

        const producto = $("#modal-title")[0].innerText;
        const cantidad = $("#cantidad").val();
        const id_producto = $("#modal-id")[0].innerText;

        console.log(`${id_producto} agregado con ${cantidad} kilos`);

        //Agrego item al carrito
        fetch(`/add-to-cart/${id_producto}/${cantidad}`, {
            method: "post"
        })
        .then(()=>{
            $('#productoModal').modal('hide');
            toastr.success(`${producto} añadido/a`);
            actualizarCantidadItemsCarrito();
        });

        //Obtengo cantidad de items en carrito y actualizo la cantidad en el icon carrito
        
    };
};


function eliminarProductoCarrito(id_producto) {

        let elemento_carrito = document.getElementsByClassName(`contenedor-producto-carrito-${id_producto}`);
        
        $.ajax({
        url: `/delete-from-cart/${id_producto}`,
        type: 'post',
        success: function(data) {
            elemento_carrito[0].remove();
            actualizarCantidadItemsCarrito();
            toastr.success(`Eliminado correctamente`);
        }
        }); 
};
