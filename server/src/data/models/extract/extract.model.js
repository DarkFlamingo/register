import { DataTypes } from 'sequelize';

const init = orm => {
  const Extract = orm.define(
    'extracts',
    {
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
    {}
  );

  return Extract;
};

export { init };
