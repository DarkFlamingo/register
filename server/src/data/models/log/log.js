import { DataTypes } from 'sequelize';

const init = orm => {
  const Log = orm.define(
    'logs',
    {
      actionType: {
        allowNull: false,
        type: DataTypes.STRING
      },
      date: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
    {}
  );

  return Log;
};

export { init };
