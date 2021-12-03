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
  NavLink,
  Icon
} from 'src/components/common/common';
import { auth as authService } from 'src/services/services';
import styles from './styles.module.scss';

const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoginError, setLoginError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoginValid, setIsLoginValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isPasswordShow, setIsPasswordShow] = React.useState(false);

  const emailChanged = data => {
    setLogin(data);
    setIsLoginValid(true);
    setLoginError(false);
  };

  const togglePasswordShow = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const passwordChanged = data => {
    setPassword(data);
    setIsPasswordValid(true);
    setLoginError(false);
  };

  const handleLoginClick = async () => {
    const isValid = isLoginValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const data = await authService.login({ login, password });

      if (data.status === 401) throw new Error();
      onLogin({ login, password }).catch(() => {
        // TODO: show error
        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading(false);
      setLoginError(true);
    }
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
            error={!isLoginValid || isLoginError}
            onChange={ev => emailChanged(ev.target.value)}
            onBlur={() => setIsLoginValid(Boolean(login))}
          />
          <div className={styles['password-wrapper-container']}>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Пароль"
              type={isPasswordShow ? 'text' : 'password'}
              error={!isPasswordValid || isLoginError}
              onChange={ev => passwordChanged(ev.target.value)}
              onBlur={() => setIsPasswordValid(Boolean(password))}
              className={styles['password-input-container']}
            />
            <div onClick={togglePasswordShow} className={styles['eye-button']}>
              <Icon name="eye" />
            </div>
          </div>
          <div className={styles['btn-wrapper']}>
            {isLoginError && (
              <label className={styles['error-msg']}>Неправильні дані</label>
            )}
            <div>
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
