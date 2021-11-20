import * as React from 'react';
import PropTypes from 'prop-types';
import { ButtonType, ButtonSize, ButtonColor } from 'src/common/enums/enums';
import { Button, Form, Segment } from 'src/components/common/common';
import styles from './styles.module.scss';

const FirstStep = ({
  loginChanged,
  isLoginValid,
  login,
  isNameValid,
  nameChanged,
  setNameValid,
  name,
  passwordChanged,
  isPasswordValid,
  setPasswordValid,
  password,
  isLoading,
  setLoginValid,
  nextStepClick
}) => (
  <Segment className={styles['registration-wrapper']}>
    <h2 className={styles.title}>Register for free account</h2>
    <Form.Input
      fluid
      icon="at"
      iconPosition="left"
      placeholder="Email"
      type="email"
      error={!isLoginValid}
      onChange={ev => loginChanged(ev.target.value)}
      onBlur={() => setLoginValid(Boolean(login))}
      value={login}
    />
    <Form.Input
      fluid
      icon="user"
      iconPosition="left"
      placeholder="Name"
      type="text"
      error={!isNameValid}
      onChange={ev => nameChanged(ev.target.value)}
      onBlur={() => setNameValid(Boolean(name))}
      value={name}
    />
    <Form.Input
      fluid
      icon="lock"
      iconPosition="left"
      placeholder="Password"
      type="password"
      onChange={ev => passwordChanged(ev.target.value)}
      error={!isPasswordValid}
      onBlur={() => setPasswordValid(Boolean(password))}
      value={password}
    />
    <div className={styles['btn-wrapper']}>
      <Button
        type={ButtonType.BUTTON}
        color={ButtonColor.TEAL}
        size={ButtonSize.LARGE}
        isLoading={isLoading}
        isFluid
        isPrimary
        onClick={nextStepClick}
        isDisabled={!(login && name && password)}
      >
        Next
      </Button>
    </div>
  </Segment>
);

FirstStep.propTypes = {
  loginChanged: PropTypes.func.isRequired,
  isLoginValid: PropTypes.bool.isRequired,
  login: PropTypes.string.isRequired,
  isNameValid: PropTypes.bool.isRequired,
  nameChanged: PropTypes.func.isRequired,
  setNameValid: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  passwordChanged: PropTypes.func.isRequired,
  isPasswordValid: PropTypes.bool.isRequired,
  setPasswordValid: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setLoginValid: PropTypes.func.isRequired,
  nextStepClick: PropTypes.func.isRequired
};

export default FirstStep;
