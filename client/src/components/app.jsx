import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StorageKey, AppRoute } from 'src/common/enums/enums';
import { storage } from 'src/services/services';
import { profileActionCreator } from 'src/store/actions';
import {
  Spinner,
  PublicRoute
} from 'src/components/common/common';
import SignPage from 'src/components/sign/sign';
import NotFoundPage from 'src/components/not-found/not-found';

const Routing = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));
  const dispatch = useDispatch();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  React.useEffect(() => {
    if (hasToken) {
      dispatch(profileActionCreator.loadCurrentUser());
    }
  }, [hasToken, dispatch]);

  if (!hasUser && hasToken) {
    return <Spinner isOverflow />;
  }

  return (
    <div className="fill">
      <main className="fill">
        <Switch>
          <PublicRoute exact path={[AppRoute.LOGIN, AppRoute.REGISTRATION]} component={SignPage} />
          <Route path={AppRoute.ANY} exact component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  );
};

export default Routing;
