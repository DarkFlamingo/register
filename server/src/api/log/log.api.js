import { LogApiPath, Role } from '../../common/enums/enums';
import { checkRoles } from '../../middlewares/middlewares';

const initLog = (Router, services) => {
  const { log: logService } = services;
  const router = Router();

  router.get(LogApiPath.ALL, checkRoles([Role.Admin]), (req, res, next) =>
    logService
      .getAllLogs()
      .then(logs => res.send(logs))
      .catch(next)
  );

  return router;
};

export { initLog };
