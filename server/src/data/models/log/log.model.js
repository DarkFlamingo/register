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
      }
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );

  return Log;
};

export { init };
