module.exports = function (sequelize, DataTypes) {
  let Appointment = sequelize.define("Appointment", {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    typeOfAppointment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });

  Appointment.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Appointment.hasMany(models.Contact, {
      onDelete: "cascade"
    });
  };
  return Appointment;
};