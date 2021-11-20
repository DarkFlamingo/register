import { DataTypes } from 'sequelize';

const init = orm => {
  const Authorities = orm.define(
    'authorities',
    {
      unitCode: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      unitName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      unitAddress: {
        allowNull: false,
        type: DataTypes.STRING
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    },
    {}
  );

  return Authorities;
};

export { init };
