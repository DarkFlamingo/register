import { Abstract } from '../abstract/abstract.repository';

class Passport extends Abstract {
  constructor({ passportModel }) {
    super(passportModel);
  }
}

export { Passport };