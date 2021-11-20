import { UserApiPath, Role } from '../../common/enums/enums';
import { checkRoles } from '../../middlewares/middlewares';

const initUser = (Router, services) => {
  const { user: userService } = services;
  const router = Router();

  router.get(
    UserApiPath.REGISTRARS,
    checkRoles([Role.Admin]),
    (req, res, next) =>
      userService
        .getAllRegistrar()
        .then(blank => res.send(blank))
        .catch(next)
  );

  router.patch(
    UserApiPath.REGISTRARS_BLOCK,
    checkRoles([Role.Admin]),
    (req, res, next) =>
      userService
        .changeActiveStatus({ registrarId: req.query.id, isActive: false })
        .then(registrar => res.send(registrar))
        .catch(next)
  );

  router.patch(
    UserApiPath.REGISTRARS_UNBLOCK,
    checkRoles([Role.Admin]),
    (req, res, next) =>
      userService
        .changeActiveStatus({ registrarId: req.query.id, isActive: true })
        .then(registrar => res.send(registrar))
        .catch(next)
  );

  return router;
};

export { initUser };
