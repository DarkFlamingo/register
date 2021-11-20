import { Abstract } from '../abstract/abstract.repository';

class Authorities extends Abstract {
  constructor({ authoritiesModel }) {
    super(authoritiesModel);
  }

  addAuthorities(authorities) {
    return this.create(authorities);
  }

  getAuthoritiesById(id) {
    return this.model.findOne({
      attributes: ['unitCode', 'unitName', 'unitAddress', 'isActive'],
      where: { id }
    });
  }
}

export { Authorities };
