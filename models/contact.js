module.exports = function(sequelize, DataTypes) {
  let Contact = sequelize.define("Contact", {
    
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
       validate: {
         isEmail: true 
       }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  
  Contact.associate = function(models) {
      // We're saying that a Post should belong to an User
      // A Post can't be created without an User due to the foreign key constraint
      Contact.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  return Contact;
};