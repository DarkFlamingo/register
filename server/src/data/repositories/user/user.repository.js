import { Abstract } from '../abstract/abstract.repository';

class User extends Abstract {
  constructor({ userModel }) {
    super(userModel);
  }

  addUser(user) {
    console.log(user);
    return this.create(user);
  }

  getByLogin(login) {
    return this.model.findOne({
      group: ['users.id'],
      attributes: ['id', 'login', 'password', 'role', 'isActive'],
      where: { login }
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
      group: ['users.id'],
      attributes: ['id', 'login', 'password', 'role', 'isActive'],
      where: { id }
    });
  }
}

export { User };
