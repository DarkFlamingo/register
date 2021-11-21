import { ServerError } from '../../helpers/helpers';

class Blank {
  constructor({ blankRepository, codeRepository }) {
    this._blankRepository = blankRepository;
    this._codeRepository = codeRepository;
  }

  async checkBlank({ series, number }) {
    const blank = await this._blankRepository.getBlankBySeriesAndNumber({
      series,
      number
    });
    if (blank) {
      return {
        isExist: true,
        blank: blank
      };
    } else {
      return {
        isExist: false
      };
    }
  }

  async addBlank({ userId, data }) {
    const { code, name, ...blankData } = data;

    const codeItem = await this._codeRepository.create({ code, name });

    if (codeItem) {
      const blank = await this._blankRepository.create({
        ...blankData,
        userId,
        codeId: codeItem.id
      });

      return blank;
    } else {
      throw new ServerError({ status: 400, message: 'Bad request' });
    }
  }
}

export { Blank };
