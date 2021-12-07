class Blank {
  constructor({ blankRepository, codeRepository, logRepository }) {
    this._blankRepository = blankRepository;
    this._codeRepository = codeRepository;
    this._logRepository = logRepository;
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

  async getAllBlanks(userId) {
    const blanks = await this._blankRepository.getAllBlanksForManage(userId);

    return blanks;
  }

  async updateBlanks(userId, { id, ...data }) {
    const { code, name, ...blankData } = data;

    let codeItem = null;

    if (code && name) {
      codeItem = await this._codeRepository.create({ code, name });
    }

    if (codeItem) {
      const blank = await this._blankRepository.updateById(id, {
        ...blankData,
        userId,
        codeId: codeItem.id
      });

      if (blank) {
        this._logRepository.create({
          actionType: 'Бланк оновлений',
          date: Date.now(),
          blankId: blank.id,
          userId: userId
        });
      }

      return blank;
    } else {
      const blank = await this._blankRepository.updateById(id, {
        ...blankData,
        userId
      });

      if (blank) {
        this._logRepository.create({
          actionType: 'Бланк оновлений',
          date: Date.now(),
          blankId: blank.id,
          userId: userId
        });
      }

      return blank;
    }
  }

  async addBlank({ userId, data }) {
    const { code, name, ...blankData } = data;

    let codeItem = null;

    if (code && name) {
      codeItem = await this._codeRepository.create({ code, name });
    }

    if (codeItem) {
      const blank = await this._blankRepository.create({
        ...blankData,
        userId,
        codeId: codeItem.id
      });

      if (blank) {
        this._logRepository.create({
          actionType: 'Бланк доданий',
          date: Date.now(),
          blankId: blank.id,
          userId: userId
        });
      }

      return blank;
    } else {
      const blank = await this._blankRepository.create({
        ...blankData,
        userId
      });

      if (blank) {
        this._logRepository.create({
          actionType: 'Бланк доданий',
          date: Date.now(),
          blankId: blank.id,
          userId: userId
        });
      }

      return blank;
    }
  }
}

export { Blank };
