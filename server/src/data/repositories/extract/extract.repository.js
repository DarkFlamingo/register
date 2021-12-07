import { Abstract } from '../abstract/abstract.repository';

class Extract extends Abstract {
  constructor({
    extractModel,
    userModel,
    passportModel,
    blankModel,
    codeModel,
    organizationModel
  }) {
    super(extractModel);
    this._userModel = userModel;
    this._passportModel = passportModel;
    this._blankModel = blankModel;
    this._codeModel = codeModel;
    this._organizationModel = organizationModel;
  }

  getNextNumber() {
    return this.model.findAll({ order: [['number', 'DESC']] });
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
            },
            {
              model: this._userModel,
              include: [
                {
                  model: this._passportModel,
                  attributes: ['name', 'surname']
                },
                {
                  model: this._organizationModel,
                  attributes: ['organizationName']
                }
              ]
            }
          ],
          attributes: ['series', 'number', 'issueDate', 'createdDate']
        }
      ],
      attributes: ['id', 'issueDate', 'params', 'isEmpty', 'isPaid', 'number'],
      where: { id }
    });
  }
}

export { Extract };
