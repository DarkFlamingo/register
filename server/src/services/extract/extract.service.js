import { Role } from '../../common/enums/enums';

class Extract {
  constructor({ extractRepository, blankRepository, userRepository }) {
    this._extractRepository = extractRepository;
    this._blankRepository = blankRepository;
    this._userRepository = userRepository;
  }

  async addExtract(user, data, params) {
    const { series, number } = params;

    const lastItem = await this._extractRepository.getNextNumber();
    const nextNumber = lastItem[0].number;

    const blank = await this._blankRepository.getBlankFromFilter({
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
        number: nextNumber,
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
        number: nextNumber,
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
