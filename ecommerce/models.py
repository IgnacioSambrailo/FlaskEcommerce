from ecommerce import db

class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(30), nullable=False)
    descripcion = db.Column(db.String(200), nullable=True)
    img = db.Column(db.String(30), nullable=False, default='default.jpeg')
    precio = db.Column(db.Integer, nullable=False)
    disponible = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f"Producto('{self.nombre}','{self.descripcion}','{self.precio}')"