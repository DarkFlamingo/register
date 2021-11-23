import { Abstract } from '../abstract/abstract.repository';

class Organization extends Abstract {
  constructor({ organizationModel }) {
    super(organizationModel);
  }
}

export { Organization };