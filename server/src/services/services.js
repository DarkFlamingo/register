import {
  user as userRepository,
  authorities as authoritiesRepository,
  passport as passportRepository,
  blank as blankRepository,
  code as codeRepository,
  organization as organizationRepository,
  position as positionRepository,
  extract as extractRepository,
  log as logRepository
} from '../data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Blank } from './blank/blank.service';
import { Http } from './http/http.service';
import { User } from './user/user.service';
import { Extract } from './extract/extract.service';
import { Log } from './log/log.service';

const http = new Http();

const auth = new Auth({
  userRepository,
  authoritiesRepository,
  passportRepository
});

const user = new User({
  userRepository,
  organizationRepository,
  positionRepository
});

const blank = new Blank({
  blankRepository,
  codeRepository,
  logRepository
});

const extract = new Extract({
  extractRepository,
  blankRepository,
  userRepository
});

const log = new Log({
  logRepository
});

export { auth, user, blank, extract, log };
