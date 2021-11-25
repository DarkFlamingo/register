import { HttpMethod } from 'src/common/enums/enums';

class Log {
  constructor({ http }) {
    this._http = http;
  }

  getAllLogs() {
    return this._http.load('/api/logs/all', {
      method: HttpMethod.GET
    });
  }
}

export { Log };
