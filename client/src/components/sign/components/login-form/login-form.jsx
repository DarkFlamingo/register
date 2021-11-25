import * as React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonType,
  ButtonSize,
  ButtonColor,
  AppRoute
} from 'src/common/enums/enums';
import {
  Button,
  Form,
  Segment,
  Message,
  NavLink
} from 'src/components/common/common';
import styles from './styles.module.scss';

const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoginValid, setIsLoginValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  const emailChanged = data => {
    setLogin(data);
    setIsLoginValid(true);
  };

  const passwordChanged = data => {
    setPassword(data);
    setIsPasswordValid(true);
  };

  const handleLoginClick = () => {
    const isValid = isLoginValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setIsLoading(true);

    onLogin({ login, password }).catch(() => {
      // TODO: show error
      setIsLoading(false);
    });
  };

  return (
    <>
      <Form name="loginForm" size="large" onSubmit={handleLoginClick}>
        <Segment className={styles['login-wrapper']}>
          <h2 className={styles.title}>Увійти до аккаунту</h2>
          <Form.Input
            fluid
            icon="at"
            iconPosition="left"
            placeholder="Логін"
            type="login"
            error={!isLoginValid}
            onChange={ev => emailChanged(ev.target.value)}
            onBlur={() => setIsLoginValid(Boolean(login))}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Пароль"
            type="password"
            error={!isPasswordValid}
            onChange={ev => passwordChanged(ev.target.value)}
            onBlur={() => setIsPasswordValid(Boolean(password))}
          />
          <div className={styles['btn-wrapper']}>
            <Button
              type={ButtonType.SUBMIT}
              color={ButtonColor.TEAL}
              size={ButtonSize.LARGE}
              isLoading={isLoading}
              isFluid
              isPrimary
            >
              Увійти
            </Button>
          </div>
        </Segment>
      </Form>
      <Message>
        Новий користувач?
        <NavLink exact to={AppRoute.REGISTRATION}>
          Зареєструватись
        </NavLink>
      </Message>
    </>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;
