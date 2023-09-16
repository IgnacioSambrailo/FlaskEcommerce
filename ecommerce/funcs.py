def crear_mensaje_whatsapp(form, session):
    nombre_cliente = form.get('nombre_apellido')
    whatsapp_cliente = form.get('numero_whatsapp')
    email_cliente = form.get('email')
    localidad_cliente = form.get('localidad')
    direccion_cliente = form.get('direccion')
    comentario_cliente = form.get('comentario')

    info_cliente = f"""*_FRUTIAGRICOLA_*%0A\
*_TIENDA ONLINE_*%0A\
%0A\
--------------------\
%0A\
*Nombre y apellido*%0A\
{nombre_cliente}%0A\
%0A\
*Tu Numero de WhatsApp*%0A\
{whatsapp_cliente}%0A\
%0A\
*Email*%0A\
{email_cliente}%0A\
%0A\
*Localidad*%0A\
{localidad_cliente}%0A\
%0A\
*Tu direccion*%0A\
{direccion_cliente}%0A\
%0A\
*Comentario*%0A\
{comentario_cliente}%0A\
%0A\
"""
    info_pedido = '*Detalle*%0A'
    sub_total_pedido = 0

    for producto in session['carrito']:
        print(producto['precio'])
        total_producto = producto['precio'] * producto['cantidad']
        sub_total_pedido += total_producto
        info_pedido = "".join([info_pedido, f"-{producto['cantidad']} x {producto['nombre']} | Precio {producto['precio']} | Total {total_producto}%0A"])
        
    info_pedido = "".join([info_pedido, f"%0A Sub-Total ARS {sub_total_pedido}"])
        
    mensaje = "".join([info_cliente, info_pedido])

    return mensaje