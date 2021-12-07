import { ExtractApiPath, Role } from '../../common/enums/enums';
import { checkRoles } from '../../middlewares/middlewares';

const initExtract = (Router, services) => {
  const { extract: extractService } = services;
  const router = Router();

  router.post(
    ExtractApiPath.ROOT,
    checkRoles([Role.Admin, Role.Registrar]),
    (req, res, next) => {
      const { series, number, ...data } = req.body;
      extractService
        .addExtract(req.user, data, { series, number })
        .then(extract => res.send(extract))
        .catch(next);
    }
  );

  return router;
};

export { initExtract };
