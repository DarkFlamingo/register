import { ApiPath } from '../common/enums/enums';
import { auth, user, blank } from '../services/services';
import { initAuth } from './auth/auth.api';
import { initBlank } from './blank/blank.api';

// register all routes
const initApi = Router => {
  const apiRouter = Router();

  apiRouter.use(
    ApiPath.AUTH,
    initAuth(Router, {
      auth,
      user
    })
  );
  apiRouter.use(
    ApiPath.BLANK,
    initBlank(Router, {
      blank
    })
  );

  return apiRouter;
};

export { initApi };
