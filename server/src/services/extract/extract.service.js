import { Role } from '../../common/enums/enums';

class Extract {
  constructor({ extractRepository, blankRepository, userRepository }) {
    this._extractRepository = extractRepository;
    this._blankRepository = blankRepository;
    this._userRepository = userRepository;
  }

  async addExtract(user, data, params) {
    const { code, name, series, number } = params;

    console.log(params);

    const blank = await this._blankRepository.getBlankFromFilter({
      code,
      name,
      series,
      number
    });

    if (blank) {
      const extract = await this._extractRepository.create({
        issueDate: Date.now(),
        userId: user.id,
        params: JSON.stringify(params),
        blankId: blank.id,
        isEmpty: false,
        isPaid: true
      });

      const readyExtract = await this._extractRepository.getExtractForView(
        extract.id
      );

      return readyExtract;
    } else {
      const extract = await this._extractRepository.create({
        issueDate: Date.now(),
        userId: user.id,
        params: JSON.stringify(params),
        blankId: null,
        isEmpty: true,
        isPaid: true
      });

      const readyExtract = await this._extractRepository.getExtractForView(
        extract.id
      );

      return readyExtract;
    }
  }
}

export { Extract };
