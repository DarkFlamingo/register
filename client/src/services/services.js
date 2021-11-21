import { Auth } from './auth/auth.service';
import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';
import { Blank } from './blank/blank.service';

const storage = new Storage({
  storage: localStorage
});

const http = new Http({
  storage
});

const auth = new Auth({
  http
});

const blank = new Blank({
  http
});

export { http, storage, auth, blank };
