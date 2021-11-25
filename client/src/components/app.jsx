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
import NotFoundPage from 'src/components/not-found/not-found';
import Main from 'src/components/main/main';

const Routing = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user,
    registrars: state.people.registrars,
    logs: state.log.logs
  }));
  const { loadCurrentUser, loadRegistrars, logout, loadUsers, loadLogs } = useAction();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  React.useEffect(() => {
    if (hasToken) {
      loadCurrentUser();
      loadRegistrars();
      loadUsers();
      loadLogs();
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
