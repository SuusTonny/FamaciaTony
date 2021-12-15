const mongoose2 = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose2;

const medicina_Schema = new Schema({
  Nombre: String,
  Marca: String,
  Lote: String,
  Fecha_caducidad: String,
  Existencia: Number
});

module.exports = mongoose2.model('medicina', medicina_Schema);