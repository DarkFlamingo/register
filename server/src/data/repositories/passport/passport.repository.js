import { Abstract } from '../abstract/abstract.repository';

class Passport extends Abstract {
  constructor({ passportModel }) {
    super(passportModel);
  }

  addPassport(passport) {
    return this.create(passport);
  }
}

export { Passport };