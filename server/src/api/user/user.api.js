import { UserApiPath, Role } from '../../common/enums/enums';
import { checkRole } from '../../middlewares/middlewares';

const initUser = (Router, services) => {
  const { user: userService } = services;
  const router = Router();

  router.get(UserApiPath.REGISTRARS, checkRole(Role.Admin), (req, res, next) =>
    userService
      .getAllRegistrar()
      .then(blank => res.send(blank))
      .catch(next)
  );

  return router;
};

export { initUser };
