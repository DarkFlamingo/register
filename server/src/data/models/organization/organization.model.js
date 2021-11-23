import { DataTypes } from 'sequelize';

const init = orm => {
  const Organization = orm.define(
    'organizations',
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
    { timestamps: false, createdAt: false, updatedAt: false }
  );

  return Organization;
};

export { init };
