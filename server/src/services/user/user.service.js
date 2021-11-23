import { Role } from '../../common/enums/enums';

class User {
  constructor({ userRepository, organizationRepository, positionRepository }) {
    this._userRepository = userRepository;
    this._organizationRepository = organizationRepository;
    this._positionRepository = positionRepository;
  }

  async getUserById(id) {
    const user = await this._userRepository.getUserById(id);

    return user;
  }

  async getAllRegistrar() {
    const registrars = await this._userRepository.getAllByRole(Role.Registrar);

    return registrars;
  }

  async getAllUsers() {
    const users = await this._userRepository.getAllByRole(Role.User);

    return users;
  }

  async changeActiveStatus({ registrarId, isActive }) {
    const registrar = await this._userRepository.updateById(registrarId, {
      isActive
    });

    return registrar;
  }

  async makeRegistrar({ id, data }) {
    const { organizationName, address, positionName } = data;

    const organization = await this._organizationRepository.create({
      organizationName,
      address
    });

    const position = await this._positionRepository.create({ positionName });

    const updatedUser = await this._userRepository.updateById(id, {
      positionId: position.id,
      organizationId: organization.id,
      role: Role.Registrar
    });

    return updatedUser;
  }
}

export { User };
