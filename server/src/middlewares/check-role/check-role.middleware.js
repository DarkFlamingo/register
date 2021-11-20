import { user as userService } from '../../services/services';
import { ServerError } from '../../helpers/helpers';

const checkRole = role => (req, _res, next) => {
  if (req.user.role === role) {
    next();
  } else {
    throw new ServerError({
      status: 403,
      message: 'You have no rights to this action'
    });
  }
};

export { checkRole };
