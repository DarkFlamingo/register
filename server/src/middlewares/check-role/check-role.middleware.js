import { user as userService } from '../../services/services';
import { ServerError } from '../../helpers/helpers';

const checkRoles = roles => (req, _res, next) => {
  if (roles.some(role => role === req.user.role)) {
    next();
  } else {
    throw new ServerError({
      status: 403,
      message: 'You have no rights to this action'
    });
  }
};

export { checkRoles };
