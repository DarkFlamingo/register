import { DataTypes } from 'sequelize';

const init = orm => {
  const Passport = orm.define(
    'passports',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      surname: {
        allowNull: false,
        type: DataTypes.STRING
      },
      patronymic: {
        allowNull: false,
        type: DataTypes.STRING
      },
      series: {
        allowNull: false,
        type: DataTypes.STRING
      },
      dateOfExpiry: {
        allowNull: false,
        type: DataTypes.DATE
      },
      dateOfIssue: {
        allowNull: false,
        type: DataTypes.DATE
      },
      documentNumber: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      RNTRC: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    },
    {}
  );

  return Passport;
};

export { init };
