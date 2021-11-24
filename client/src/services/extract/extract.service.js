import { HttpMethod, ContentType } from 'src/common/enums/enums';

class Extract {
  constructor({ http }) {
    this._http = http;
  }

  getExtract(data) {
    return this._http.load('/api/extracts', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(data)
    });
  }
}

export { Extract };
