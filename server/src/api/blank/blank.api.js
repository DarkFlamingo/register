import { BlankApiPath } from '../../common/enums/enums';

const initBlank = (Router, services) => {
  const { blank: blankService } = services;
  const router = Router();

  router.get(BlankApiPath.CHECK, (req, res, next) =>
    blankService
      .checkBlank(req.query)
      .then(blank => res.send(blank))
      .catch(next)
  );

  return router;
};

export { initBlank };
