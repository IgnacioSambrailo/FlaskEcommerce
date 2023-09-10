window.onload = function() {
    actualizarDetalleCompra();
};

function mostrarDetallesProducto(id) {
    const bodyProducto = $('.modal-content')[0];

    fetch(`/producto/${id}`, {
        method:'get'
    })
    .then(response => {
        return response.text()
    })
    .then(html => {
        if (html != 0){
            bodyProducto.innerHTML=html;
        }
    })
    // Abre el modal
    $('#productoModal').modal('show');
}

function mostrarCarrito() {
    // Llena el modal con la información del producto
    const bodyCarrito = $('.modal-body-carrito')[0];

    fetch('/cart', {
        method:'get'
    })
    .then(response => {
        return response.text()
    })
    .then(html => {
        if (html != 0){
            bodyCarrito.innerHTML=html;
        }
    })
    // Abre el modal
    $('#modalCart').modal('show');
}

function actualizarCantidadItemsCarrito() {
    const cantidad_items_carrito = $(".item_cart_number")[0];

    fetch(`/cart-info`)
        .then(response => response.json())
        .then(data => {
            const itemCount = data.length;
            cantidad_items_carrito.innerHTML = itemCount ? `(${itemCount})` : "";
            console.log(itemCount)
            if (itemCount == 0){
                document.getElementById('advertencia-carrito').innerText = 'Aun no agregaste nada a tu carrito...'
            }
            else{
                document.getElementById('advertencia-carrito').innerText = ''
            }
        })
        .catch(error => {
            console.error(error);
        });
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

function eliminarProductoCarrito(id_producto) {

        let elemento_carrito = document.getElementsByClassName(`contenedor-producto-carrito-${id_producto}`);
        
        $.ajax({
        url: `/delete-from-cart/${id_producto}`,
        type: 'post',
        success: function(data) {
            elemento_carrito[0].remove();
            actualizarCantidadItemsCarrito();
            actualizarDetalleCompra();
            toastr.success(`Eliminado correctamente`);
        }
        }); 
};

function actualizarDetalleCompra(){

    let precio_final = 0;
    let cantidad_productos = 0;

    fetch(`/cart-info`)
        .then(response => response.json())
        .then(data => {
            cantidad_productos = data.length;
            data.forEach(producto => {
                precio_final += producto.precio * producto.cantidad;
            });
            

            $('#descripcion')[0].innerHTML = `Unidades en carrito (${cantidad_productos})`;
            $('#cantidad-productos')[0].innerHTML = `${cantidad_productos} Productos`;
            $('#importe-final')[0].innerHTML = `${precio_final} $ARS`

        })
        .catch(error => {
            console.error(error);
        });

}

function agregarProductoCarrito(event, id_producto){

    event.preventDefault();

    const cantidadForm = document.getElementById("cantidad-form");
    const cantidad = cantidadForm.elements.cantidad.value;
    const producto = $("#modal-title")[0].innerText;


    console.log(`${id_producto} agregado con ${cantidad} kilos`);

    //Agrego item al carrito
    fetch(`/add-to-cart/${id_producto}/${cantidad}`, {
        method: "post"
    })
    .then(()=>{
        $('#productoModal').modal('hide');
        toastr.success(`${producto} añadido/a`);
        actualizarCantidadItemsCarrito();
        actualizarDetalleCompra();
    });
    
};
