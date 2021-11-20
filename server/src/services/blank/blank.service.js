class Blank {
  constructor({ blankRepository }) {
    this._blankRepository = blankRepository;
  }

  async checkBlank({ series, number }) {
    const blank = await this._blankRepository.getBlankBySeriesAndNumber({
      series,
      number
    });
    if (blank) {
      return blank;
    } else {
      return null;
    }
  }
}

export { Blank };
