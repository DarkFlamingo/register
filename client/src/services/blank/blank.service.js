import { HttpMethod, ContentType } from 'src/common/enums/enums';

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

  makeRegistrar(id, data) {
    return this._http.load(`/api/users/make-registrar/${id}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify(data)
    });
  }

  addBlank(data) {
    return this._http.load('/api/blanks', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(data)
    });
  }
}

export { Blank };
