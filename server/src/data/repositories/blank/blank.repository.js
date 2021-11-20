import { Abstract } from '../abstract/abstract.repository';

class Blank extends Abstract {
  constructor({ blankModel }) {
    super(blankModel);
  }

  addBlank(blank) {
    return this.create(blank);
  }

  getBlankById(id) {
    return this.model.findOne({
      attributes: ['unitCode', 'unitName', 'unitAddress', 'isActive'],
      where: { id }
    });
  }
}

export { Blank };
