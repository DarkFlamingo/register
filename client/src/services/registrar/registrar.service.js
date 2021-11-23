import { HttpMethod } from 'src/common/enums/enums';

class Registrar {
  constructor({ http }) {
    this._http = http;
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
}

export { Registrar };
