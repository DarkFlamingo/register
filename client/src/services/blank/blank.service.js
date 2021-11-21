import { HttpMethod } from 'src/common/enums/enums';

class Blank {
  constructor({ http }) {
    this._http = http;
  }

  checkBlank(payload) {
    return this._http.load('/api/blanks/check', {
      method: HttpMethod.GET,
      query: payload
    });
  }
}

export { Blank };
