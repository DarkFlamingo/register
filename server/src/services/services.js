import {
  user as userRepository,
  authorities as authoritiesRepository,
  passport as passportRepository
} from '../data/repositories/repositories';
import { Auth } from './auth/auth.service';
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

export { auth, user };
