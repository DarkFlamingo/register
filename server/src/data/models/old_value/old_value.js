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
    {}
  );

  return OldValue;
};

export { init };
