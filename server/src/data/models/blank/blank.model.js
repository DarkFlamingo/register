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
      },
      number: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );

  return Blank;
};

export { init };
