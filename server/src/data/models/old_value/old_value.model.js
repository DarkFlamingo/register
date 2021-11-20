import { DataTypes } from 'sequelize';

const init = orm => {
  const OldValue = orm.define(
    'old_values',
    {
      issueDate: {
        allowNull: true,
        type: DataTypes.DATE
      },
      codeId: {
        allowNull: true,
        type: DataTypes.STRING
      },
      blankId: {
        allowNull: true,
        type: DataTypes.STRING
      },
      series: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );

  return OldValue;
};

export { init };
