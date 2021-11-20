import { DataTypes } from 'sequelize';

const init = orm => {
  const Position = orm.define(
    'positions',
    {
      positionName: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );

  return Position;
};

export { init };
