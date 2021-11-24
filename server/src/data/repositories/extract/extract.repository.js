import { Abstract } from '../abstract/abstract.repository';

class Extract extends Abstract {
  constructor({
    extractModel,
    userModel,
    passportModel,
    blankModel,
    codeModel
  }) {
    super(extractModel);
    this._userModel = userModel;
    this._passportModel = passportModel;
    this._blankModel = blankModel;
    this._codeModel = codeModel;
  }

  getExtractForView(id) {
    return this.model.findOne({
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
          attributes: ['series']
        }
      ],
      attributes: ['id', 'issueDate', 'params', 'isEmpty', 'isPaid'],
      where: { id }
    });
  }
}

export { Extract };
