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

  getBlankFromFilter({ code, name, series, number }) {
    let where = this.getWhereCondition({ series, number });
    let secondWhere = this.getWhereConditionSecond({ code, name });

    console.log(where);
    console.log(secondWhere);

    if (where) {
      if (secondWhere) {
        return this.model.findOne({
          group: ['blanks.id', 'code.id'],
          include: [
            {
              model: this._codeModel,
              where: secondWhere
            }
          ],
          where: where
        });
      } else {
        return this.model.findOne({
          group: ['blanks.id', 'code.id'],
          include: [
            {
              model: this._codeModel
            }
          ],
          where: where
        });
      }
    } else {
      if (secondWhere) {
        return this.model.findOne({
          group: ['blanks.id', 'code.id'],
          include: [
            {
              model: this._codeModel,
              where: secondWhere
            }
          ]
        });
      } else {
        return this.model.findOne({
          group: ['blanks.id', 'code.id'],
          include: [
            {
              model: this._codeModel
            }
          ]
        });
      }
    }
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
