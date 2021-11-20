import { Role } from '../../common/enums/enums';

class User {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this._userRepository.getUserById(id);

    return user;
  }

  async getAllRegistrar() {
    const registrars = await this._userRepository.getAllByRole(Role.Registrar);

    return registrars;
  }
}

export { User };
