import {
  user as userRepository,
  authorities as authoritiesRepository,
  passport as passportRepository,
  blank as blankRepository
} from '../data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Blank } from './blank/blank.service';
import { Http } from './http/http.service';
import { User } from './user/user.service';

const http = new Http();

const auth = new Auth({
  userRepository,
  authoritiesRepository,
  passportRepository
});

const user = new User({
  userRepository
});

const blank = new Blank({
  blankRepository
});

export { auth, user, blank };
