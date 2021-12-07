import { Abstract } from '../abstract/abstract.repository';

class Blank extends Abstract {
  constructor({ blankModel, codeModel }) {
    super(blankModel);
    this._codeModel = codeModel;
  }

  addBlank(blank) {
    return this.create(blank);
  }

  getWhereCondition({ series, number }) {
    if (series) {
      if (number) {
        return { number, series };
      }
      return { series };
    }
    if (number) {
      return { series };
    }
    return null;
  }

  getWhereConditionSecond({ name, code }) {
    if (code) {
      if (name) {
        return { name, code };
      }
      return { code };
    }
    if (name) {
      return { name };
    }
    return null;
  }

  getBlankFromFilter({ series, number }) {
    if (series) {
      if (number) {
        return this.model.findOne({
          group: ['blanks.id', 'code.id'],
          include: [
            {
              model: this._codeModel
            }
          ],
          where: { number, series }
        });
      } else {
        return this.model.findOne({
          group: ['blanks.id', 'code.id'],
          include: [
            {
              model: this._codeModel
            }
          ],
          where: { series }
        });
      }
    }

    if (number) {
      return this.model.findOne({
        group: ['blanks.id', 'code.id'],
        include: [
          {
            model: this._codeModel
          }
        ],
        where: { number }
      });
    }

    return null;
  }

  getBlankBySeriesAndNumber({ number, series }) {
    return this.model.findOne({
      group: ['blanks.id', 'code.id'],
      attributes: ['issueDate', 'series', 'number', 'id'],
      include: [
        {
          model: this._codeModel,
          attributes: ['code', 'name']
        }
      ],
      where: { number, series }
    });
  }

  getAllBlanksForManage(userId) {
    return this.model.findAll({
      group: ['blanks.id', 'code.id'],
      attributes: ['issueDate', 'series', 'number', 'id'],
      include: [
        {
          model: this._codeModel,
          attributes: ['code', 'name']
        }
      ],
      where: { userId: userId }
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
