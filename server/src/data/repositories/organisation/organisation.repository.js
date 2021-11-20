import { Abstract } from '../abstract/abstract.repository';

class Organisation extends Abstract {
  constructor({ organisationModel }) {
    super(organisationModel);
  }
}

export { Organisation };