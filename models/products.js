module.exports = function(sequelize, DataTypes) {
    let Products = sequelize.define("Products", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    });
    Products.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Products.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Products;
  };