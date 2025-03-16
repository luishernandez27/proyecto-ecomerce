'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carrito extends Model {
    static associate(models) {
      Carrito.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Carrito.belongsTo(models.Producto, { foreignKey: 'producto_id' });
    }
  }
  
  Carrito.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Carrito',
  });

  return Carrito;
};
