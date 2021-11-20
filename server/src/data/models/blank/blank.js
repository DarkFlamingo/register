import { DataTypes } from 'sequelize';

const init = orm => {
  const Blank = orm.define(
    'blanks',
    {
      issueDate: {
        allowNull: false,
        type: DataTypes.DATE
      },
      series: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );

  return Blank;
};

export { init };
