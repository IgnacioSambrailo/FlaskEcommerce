from flask import session, redirect, url_for, render_template, flash, redirect, request
from ecommerce import app
from ecommerce.forms import InformacionCliente
from ecommerce.models import Producto

@app.route("/", methods=['GET', 'POST'])
@app.route("/home", methods=['GET', 'POST'])
def home():
    form = InformacionCliente()
    if form.validate_on_submit():
        print(f'pedido creado por {form.nombre_apellido.data}')
    if 'carrito' not in session:
        session['carrito'] = []
        total_carrito = 0
        cantidad_productos_carrito = 0
    else:
        total_carrito = 0
        cantidad_productos_carrito = len(session['carrito'])
        pass
    return render_template('home.html',
                            productos=Producto.query.all(),
                            title='Home',
                            form=form,
                            info_carrito=session['carrito'],
                            total_carrito=total_carrito,
                            cantidad_productos_carrito = cantidad_productos_carrito
                            )

@app.route("/add-to-cart/<int:id_producto>/<int:cantidad_producto>", methods=['GET', 'POST'])
def add_to_cart(id_producto, cantidad_producto):
    carrito = session['carrito']
    for producto in carrito:
        if producto['id'] == id_producto:
            producto['cantidad'] += cantidad_producto
            break
    else:
        producto = Producto.query.get(id_producto)
        carrito.append({'id':id_producto, 'cantidad':cantidad_producto, 'nombre':producto.nombre, 'precio':producto.precio})

    session['carrito'] = carrito
    return 'OK'


@app.route("/producto/<int:id_producto>", methods=['GET'])
def producto(id_producto):
    producto = Producto.query.get(id_producto)
    return render_template('producto.html', producto= producto)


@app.route("/delete-from-cart/<int:id_producto>", methods=['GET', 'POST'])
def delete_from_cart(id_producto):
    carrito = session['carrito']
    for producto in carrito.copy():
        if producto['id'] == id_producto:
            carrito.remove(producto)
            break
    else:
        pass

    session['carrito'] = carrito
    return redirect(url_for('home'))


@app.route("/cart", methods=['GET', 'POST'])
def cart():
    if session['carrito']:
        return render_template('carrito.html', info_carrito=session['carrito'])
    else:
        return '0'


@app.route("/cart-info", methods=['GET', 'POST'])
def cart_info():
    if session['carrito']:
        return session['carrito']
    else:
        return []