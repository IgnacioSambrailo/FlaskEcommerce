from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, IntegerField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, Email, NumberRange

LOCALIDADES = ['Casilda', 'Rosario', 'Fuentes', 'Pujato', 'Zavalla', 'Perez']

class InformacionCliente(FlaskForm):
    nombre_apellido = StringField('Nombre y Apellido', validators=[DataRequired(), Length(min=2, max=40)])
    numero_whatsapp = IntegerField('Numero de WhatsApp', validators=[DataRequired(),])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    localidad = SelectField('Localidad', choices=LOCALIDADES, validators=[DataRequired()])
    direccion = StringField('Direccion', validators=[DataRequired(), Length(min=2, max=40)])
    comentario = StringField('Comentario', validators=[Length(min=2, max=200)])
    submit = SubmitField('Procesar e ir a enviar')
