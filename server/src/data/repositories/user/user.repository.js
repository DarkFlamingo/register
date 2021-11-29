import { Abstract } from '../abstract/abstract.repository';

class User extends Abstract {
  constructor({ userModel, positionModel, organizationModel }) {
    super(userModel);
    this._organizationModel = organizationModel;
    this._positionModel = positionModel;
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
      where: { role }
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
