import { Abstract } from '../abstract/abstract.repository';

class Blank extends Abstract {
  constructor({ blankModel, codeModel }) {
    super(blankModel);
    this._codeModel = codeModel;
  }

  addBlank(blank) {
    return this.create(blank);
  }

  getBlankBySeriesAndNumber({ number, series }) {
    return this.model.findOne({
      group: ['blanks.id', 'code.id'],
      attributes: ['issueDate', 'series', 'number'],
      include: [
        {
          model: this._codeModel,
          attributes: ['code', 'name']
        }
      ],
      where: { number, series }
    });
  }

  getBlankById(id) {
    return this.model.findOne({
      attributes: ['unitCode', 'unitName', 'unitAddress', 'isActive'],
      where: { id }
    });
  }
}

export { Blank };
