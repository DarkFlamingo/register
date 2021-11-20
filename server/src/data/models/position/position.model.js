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
    { timestamps: false, createdAt: false, updatedAt: false }
  );

  return Position;
};

export { init };
