import { ApiPath } from '../common/enums/enums';
import { auth, user, blank, extract } from '../services/services';
import { initAuth } from './auth/auth.api';
import { initBlank } from './blank/blank.api';
import { initUser } from './user/user.api';
import { initExtract } from './extract/extract.api';

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
  apiRouter.use(
    ApiPath.USER,
    initUser(Router, {
      user
    })
  );
  apiRouter.use(
    ApiPath.EXTRACT,
    initExtract(Router, {
      extract
    })
  );

  return apiRouter;
};

export { initApi };
