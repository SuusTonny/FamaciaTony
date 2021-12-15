const mongoose3 = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose3;

const producto_Schema = new Schema({
  Nombre: String,
  Precio: Number,
  Existencia: Number
});

module.exports = mongoose3.model('producto', producto_Schema);