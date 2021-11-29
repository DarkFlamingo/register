import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAction } from 'src/hooks/useAction';
import { StorageKey, AppRoute } from 'src/common/enums/enums';
import { storage } from 'src/services/services';
import {
  Spinner,
  PublicRoute,
  PrivateRoute
} from 'src/components/common/common';
import SignPage from 'src/components/sign/sign';
import PublicPage from 'src/components/public-page/public-page';
import NotFoundPage from 'src/components/not-found/not-found';
import Main from 'src/components/main/main';

const Routing = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));
  const {
    loadCurrentUser,
    loadRegistrars,
    logout,
    loadUsers,
    loadLogs,
    loadAllBlanks
  } = useAction();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN) && storage.getItem(StorageKey.TOKEN) !== 'undefined');
  const hasUser = Boolean(user);

  React.useEffect(() => {
    if (hasToken) {
      loadCurrentUser();
      loadRegistrars();
      loadUsers();
      loadLogs();
      loadAllBlanks();
    }
  }, [hasToken]);

  if (!hasUser && hasToken) {
    return <Spinner isOverflow />;
  }

  const handleLogOut = () => {
    logout();
  };

  return (
    <div className="fill">
      <main className="fill">
        <Switch>
          <PublicRoute
            exact
            path={[AppRoute.LOGIN, AppRoute.REGISTRATION]}
            component={SignPage}
          />
          <PublicRoute
            exact
            path={[AppRoute.CHECK, AppRoute.REGISTRATION]}
            component={PublicPage}
          />
          <PrivateRoute
            exact
            path={AppRoute.ROOT}
            component={() => <Main handleLogOut={handleLogOut} />}
          />
          <Route path={AppRoute.ANY} exact component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  );
};

export default Routing;
