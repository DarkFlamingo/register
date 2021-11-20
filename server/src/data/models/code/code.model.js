import { DataTypes } from 'sequelize';

const init = orm => {
  const Code = orm.define(
    'codes',
    {
      code: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );

  return Code;
};

export { init };
