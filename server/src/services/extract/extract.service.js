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
      const extract = this._extractRepository.create({
        issueDate: Date.now(),
        userId: user.id,
        params: JSON.stringify(params),
        blankId: blank.id,
        isEmpty: false,
        isPaid: true
      });

      return extract;
    } else {
      const extract = this._extractRepository.create({
        issueDate: Date.now(),
        userId: user.id,
        params: JSON.stringify(params),
        blankId: null,
        isEmpty: true,
        isPaid: true
      });

      return extract;
    }
  }
}

export { Extract };
