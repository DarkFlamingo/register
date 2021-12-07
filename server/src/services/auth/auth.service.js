import { encrypt, createToken } from '../../helpers/helpers';
import { Role } from '../../common/enums/enums';

class Auth {
  constructor({ userRepository, authoritiesRepository, passportRepository }) {
    this._userRepository = userRepository;
    this._authoritiesRepository = authoritiesRepository;
    this._passportRepository = passportRepository;

    this.register = this.register.bind(this);
  }

  async login({ id }) {
    return {
      token: createToken({ id }),
      user: await this._userRepository.getUserById(id)
    };
  }

  async register({ login, password }, body) {
    const { unitCode, unitName, unitAddress, isActive } = body;
    const newAthorities = await this._authoritiesRepository.addAuthorities({
      unitCode,
      unitName,
      unitAddress,
      isActive
    });

    const {
      name,
      surname,
      patronymic,
      series,
      dateOfExpiry,
      dateOfIssue,
      documentNumber,
      RNTRC,
      birthday
    } = body;

    const authorityId = newAthorities.id;
    const newPassport = await this._passportRepository.addPassport({
      name,
      surname,
      patronymic,
      series,
      dateOfExpiry,
      dateOfIssue,
      documentNumber,
      RNTRC,
      authorityId,
      birthday
    });

    const passportId = newPassport.id;
    const newUser = await this._userRepository.addUser({
      login,
      role: Role.User,
      isActive: true,
      password: await encrypt(password),
      passportId
    });

    return this.login(newUser);
  }
}

export { Auth };
