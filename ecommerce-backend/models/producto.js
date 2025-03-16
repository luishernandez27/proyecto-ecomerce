'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Producto extends Model {
    static associate(models) {
      // Aquí puedes definir asociaciones si las necesitas
    }
  }

  Producto.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Producto',
      tableName: 'Productos', // Opcional: Define el nombre exacto de la tabla en la BD
    }
  );

  return Producto;
};
