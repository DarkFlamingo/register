/* eslint-disable */
import * as React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import NotFoundPage from 'src/components/not-found/not-found';
import { Button, Grid } from 'src/components/common/common';
import { Role } from '../../common/enums/enums';
import { MainAdmin, MainUser, MainRegistrar } from './component/component';
import './styles.scss';

const Main = ({ handleLogOut }) => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  const renderUserMain = () => <MainUser />;

  const renderAdminMain = () => <MainAdmin />;

  const renderRegistrarMain = () => <MainRegistrar />;

  const renderMain = () => {
    switch (user.role) {
      case Role.User: {
        return renderUserMain();
      }
      case Role.Admin: {
        return renderAdminMain();
      }
      case Role.Registrar: {
        return renderRegistrarMain();
      }
      default: {
        return <NotFoundPage />;
      }
    }
  };

  return (
    <>
      <Button className="btn-header" onClick={handleLogOut}>
        Exit
      </Button>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        className="fill main-content"
      >
        {renderMain()}
      </Grid>
    </>
  );
};

Main.propTypes = {
  handleLogOut: PropTypes.func.isRequired
};

export default Main;
