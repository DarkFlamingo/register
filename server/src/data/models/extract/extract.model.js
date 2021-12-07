import { DataTypes } from 'sequelize';

const init = orm => {
  const Extract = orm.define(
    'extracts',
    {
      number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      issueDate: {
        allowNull: false,
        type: DataTypes.DATE
      },
      params: {
        allowNull: false,
        type: DataTypes.STRING
      },
      isEmpty: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      isPaid: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );

  return Extract;
};

export { init };
