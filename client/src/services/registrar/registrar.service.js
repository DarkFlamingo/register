import { HttpMethod, ContentType } from 'src/common/enums/enums';

class Registrar {
  constructor({ http }) {
    this._http = http;
  }

  loadUsers() {
    return this._http.load('/api/users/users', {
      method: HttpMethod.GET
    });
  }

  loadRegistrars() {
    return this._http.load('/api/users/registrars', {
      method: HttpMethod.GET
    });
  }

  blockRegistrar(id) {
    return this._http.load('/api/users/registrars/blocked', {
      method: HttpMethod.PATCH,
      query: {
        id
      }
    });
  }

  unblockRegistrar(id) {
    return this._http.load('/api/users/registrars/unblocked', {
      method: HttpMethod.PATCH,
      query: {
        id
      }
    });
  }

  makeRegistrar(id, data) {
    return this._http.load(`/api/users/make-registrar/${id}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify(data)
    });
  }
}

export { Registrar };
