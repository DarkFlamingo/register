import { DataTypes } from 'sequelize';

const init = orm => {
  const Organisation = orm.define(
    'organisations',
    {
      organizationName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );

  return Organisation;
};

export { init };
