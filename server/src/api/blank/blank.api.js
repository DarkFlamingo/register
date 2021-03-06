import { BlankApiPath, Role } from '../../common/enums/enums';
import { checkRoles } from '../../middlewares/middlewares';

const initBlank = (Router, services) => {
  const { blank: blankService } = services;
  const router = Router();

  router.get(BlankApiPath.CHECK, (req, res, next) =>
    blankService
      .checkBlank(req.query)
      .then(blank => res.send(blank))
      .catch(next)
  );

  router.get(
    BlankApiPath.ALL,
    checkRoles([Role.Admin, Role.Registrar]),
    (req, res, next) =>
      blankService
        .getAllBlanks(req.user.id)
        .then(blanks => res.send(blanks))
        .catch(next)
  );

  router.put(
    BlankApiPath.UPDATE,
    checkRoles([Role.Admin, Role.Registrar]),
    (req, res, next) =>
      blankService
        .updateBlanks(req.user.id, { id: req.body.id, ...req.body })
        .then(blank => res.send(blank))
        .catch(next)
  );

  router.post(
    BlankApiPath.ROOT,
    checkRoles([Role.Admin, Role.Registrar]),
    (req, res, next) =>
      blankService
        .addBlank({ userId: req.user.id, data: req.body })
        .then(blank => res.send(blank))
        .catch(next)
  );

  return router;
};

export { initBlank };
