module.exports = function (sequelize, DataTypes) {
  let Appointments = sequelize.define("Appointments", {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    typeOfAppointment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });

  Appointments.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Appointments.hasMany(models.Contacts, {
      onDelete: "cascade"
    });
  };
  return Appointments;
};