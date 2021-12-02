import { Abstract } from '../abstract/abstract.repository';

class User extends Abstract {
  constructor({ userModel, positionModel, organizationModel, passportModel }) {
    super(userModel);
    this._organizationModel = organizationModel;
    this._positionModel = positionModel;
    this._passportModel = passportModel;
  }

  addUser(user) {
    return this.create(user);
  }

  getByLogin(login) {
    return this.model.findOne({
      group: ['users.id'],
      attributes: ['id', 'login', 'password', 'role', 'isActive'],
      where: { login }
    });
  }

  getAllByRole(role) {
    return this.model.findAll({
      where: { role },
      include: [
        {
          model: this._organizationModel
        },
        {
          model: this._positionModel
        },
        {
          model: this._passportModel
        }
      ],
      order: [['login', 'ASC']]
    });
  }

  getByUsername(username) {
    return this.model.findOne({
      group: ['users.id'],
      attributes: ['id', 'login', 'password', 'role', 'isActive'],
      where: { username }
    });
  }

  getUserById(id) {
    return this.model.findOne({
      attributes: ['id', 'login', 'password', 'role', 'isActive'],
      include: [
        {
          model: this._organizationModel
        },
        {
          model: this._positionModel
        }
      ],
      where: { id }
    });
  }
}

export { User };
