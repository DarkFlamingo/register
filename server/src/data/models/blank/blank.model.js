import { DataTypes } from 'sequelize';

const init = orm => {
  const Blank = orm.define(
    'blanks',
    {
      createdDate: {
        allowNull: true,
        type: DataTypes.DATE
      },
      issueDate: {
        allowNull: true,
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
