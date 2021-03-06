import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { ENV } from '../common/enums/enums';
import { user as userRepository } from '../data/repositories/repositories';
import { cryptCompare } from '../helpers/helpers';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV.JWT.SECRET
};

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'login' },
    async (login, password, done) => {
      try {
        const user = await userRepository.getByLogin(login);
        if (!user) {
          return done({ status: 401, message: 'Incorrect login.' }, false);
        }
        return (await cryptCompare(password, user.password))
          ? done(null, user)
          : done(
              { status: 401, message: 'Passwords do not match.' },
              null,
              false
            );
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'login' },
    async (login, password, done) => {
      try {
        const userByLogin = await userRepository.getByLogin(login);
        if (userByLogin) {
          return done(
            { status: 401, message: 'Email is already taken.' },
            null
          );
        }

        return done(null, { login, password });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JwtStrategy(options, async ({ id }, done) => {
    try {
      const user = await userRepository.getById(id);
      return user
        ? done(null, user)
        : done({ status: 401, message: 'Token is invalid.' }, null);
    } catch (err) {
      return done(err);
    }
  })
);
