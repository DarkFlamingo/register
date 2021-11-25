import { ApiPath } from '../common/enums/enums';
import { auth, user, blank, extract, log } from '../services/services';
import { initAuth } from './auth/auth.api';
import { initBlank } from './blank/blank.api';
import { initUser } from './user/user.api';
import { initExtract } from './extract/extract.api';
import { initLog } from './log/log.api';

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
  apiRouter.use(
    ApiPath.LOG,
    initLog(Router, {
      log
    })
  );

  return apiRouter;
};

export { initApi };
