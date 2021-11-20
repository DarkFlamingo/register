import { ApiPath } from '../common/enums/enums';
import { auth, user } from '../services/services';
import { initAuth } from './auth/auth.api';

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

  return apiRouter;
};

export { initApi };
