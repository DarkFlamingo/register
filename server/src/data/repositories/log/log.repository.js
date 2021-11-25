import { Abstract } from '../abstract/abstract.repository';

class Log extends Abstract {
  constructor({ logModel, blankModel, userModel, passportModel, codeModel }) {
    super(logModel);
    this._blankModel = blankModel;
    this._userModel = userModel;
    this._passportModel = passportModel;
    this._codeModel = codeModel;
  }

  getAllLogs() {
    return this.model.findAll({
      group: [],
      include: [
        {
          model: this._userModel,
          include: [
            {
              model: this._passportModel,
              attributes: ['name', 'surname']
            }
          ]
        },
        {
          model: this._blankModel,
          include: [
            {
              model: this._codeModel,
              attributes: ['name', 'code']
            }
          ],
          attributes: ['series', 'number']
        }
      ]
    });
  }
}

export { Log };
