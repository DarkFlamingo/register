import { ExtractApiPath, Role } from '../../common/enums/enums';
import { checkRoles } from '../../middlewares/middlewares';

const initExtract = (Router, services) => {
  const { extract: extractService } = services;
  const router = Router();

  router.post(
    ExtractApiPath.ROOT,
    checkRoles([Role.Admin]),
    (req, res, next) => {
      const { code, name, series, number, ...data } = req.body;
      extractService
        .addExtract(req.user, data, { code, name, series, number })
        .then(extract => res.send(extract))
        .catch(next);
    }
  );

  return router;
};

export { initExtract };
