import { Role } from '../../common/enums/enums';

class Log {
  constructor({ logRepository }) {
    this._logRepository = logRepository;
  }

  async getAllLogs() {
    const logs = await this._logRepository.getAllLogs();

    return logs;
  }
}

export { Log };
