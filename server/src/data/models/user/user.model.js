import { DataTypes } from 'sequelize';

const init = orm => {
  const User = orm.define(
    'users',
    {
      login: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    }
  );

  return User;
};

export { init };
