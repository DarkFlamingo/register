import * as React from 'react';
import PropTypes from 'prop-types';
import { UNIT_ADDRESS, UNIT_NAME } from 'src/common/constants/constants';
import { AppRoute } from 'src/common/enums/enums';
import { Form, Message, NavLink } from 'src/components/common/common';
import { SecondStep } from './components/components';

const RegistrationForm = ({ onRegister }) => {
  const [login, setLogin] = React.useState('');
  const [isLoginValid, setLoginValid] = React.useState(true);

  const [password, setPassword] = React.useState('');
  const [isPasswordValid, setPasswordValid] = React.useState(true);

  const [name, setName] = React.useState('');
  const [isNameValid, setNameValid] = React.useState(true);

  const [surname, setSurname] = React.useState('');
  const [isSurnameValid, setSurnameValid] = React.useState(true);

  const [patronymic, setPatronymic] = React.useState('');
  const [isPatronymicValid, setPatronymicValid] = React.useState(true);

  const [series, setSeries] = React.useState('');
  const [isSeriesValid, setSeriesValid] = React.useState(true);

  const [dateOfExpiry, setDateOfExpiry] = React.useState('');
  const [isDateOfExpiryValid, setDateOfExpiryValid] = React.useState(true);

  const [dateOfIssue, setDateOfIssue] = React.useState('');
  const [isDateOfIssueValid, setDateOfIssueValid] = React.useState(true);

  const [documentNumber, setDocumentNumber] = React.useState('');
  const [isDocumentNumberValid, setDocumentNumberValid] = React.useState(true);

  const [RNTRC, setRNTRC] = React.useState('');
  const [isRNTRCeValid, setRNTRCValid] = React.useState(true);

  const [unitCode, setUnitCode] = React.useState('');
  const [isUnitCodeValid, setUnitCodeValid] = React.useState(true);

  const [isLoading, setLoading] = React.useState(false);

  const loginChanged = value => {
    setLogin(value);
    setLoginValid(true);
  };

  const nameChanged = value => {
    setName(value);
    setNameValid(true);
  };

  const passwordChanged = value => {
    setPassword(value);
    setPasswordValid(true);
  };

  const surnameChanged = value => {
    setSurname(value);
    setSurnameValid(true);
  };

  const patronymicChanged = value => {
    setPatronymic(value);
    setPatronymicValid(true);
  };

  const seriesChanged = value => {
    setSeries(value);
    setSeriesValid(true);
  };

  const dateOfExpiryChanged = value => {
    setDateOfExpiry(value);
    setDateOfExpiryValid(true);
  };

  const dateOfIssueChanged = value => {
    setDateOfIssue(value);
    setDateOfIssueValid(true);
  };

  const documentNumberChanged = value => {
    setDocumentNumber(value);
    const regExp = new RegExp('^[0-9]+$');
    setDocumentNumberValid(regExp.test(value));
  };

  const RNTRCChanged = value => {
    setRNTRC(value);
    const regExp = new RegExp('^[0-9]+$');
    setRNTRCValid(regExp.test(value) && value.length === 10);
  };

  const unitCodeChanged = value => {
    setUnitCode(value);
    setUnitCodeValid(true);
  };

  const register = async () => {
    const isValid = isLoginValid && isNameValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setLoading(true);
    try {
      const dateForTransform = new Date(dateOfIssue);
      const dateOfExpiryFinal = new Date(dateOfIssue);
      dateOfExpiryFinal.setFullYear(dateForTransform.getFullYear() + 10);

      const unitAddress = UNIT_ADDRESS[unitCode];
      const unitName = UNIT_NAME[unitCode];

      await onRegister({
        login,
        password,
        name,
        surname,
        patronymic,
        series,
        dateOfExpiry: dateOfExpiryFinal,
        dateOfIssue,
        documentNumber,
        RNTRC,
        unitCode,
        unitName,
        unitAddress,
        isActive: true
      });
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <Form name="registrationForm" size="large">
        <SecondStep
          register={register}
          isLoading={isLoading}
          surname={surname}
          surnameChanged={surnameChanged}
          isSurnameValid={isSurnameValid}
          setSurnameValid={setSurnameValid}
          patronymic={patronymic}
          patronymicChanged={patronymicChanged}
          isPatronymicValid={isPatronymicValid}
          setPatronymicValid={setPatronymicValid}
          series={series}
          seriesChanged={seriesChanged}
          isSeriesValid={isSeriesValid}
          setSeriesValid={setSeriesValid}
          dateOfExpiry={dateOfExpiry}
          dateOfExpiryChanged={dateOfExpiryChanged}
          isDateOfExpiryValid={isDateOfExpiryValid}
          setDateOfExpiryValid={setDateOfExpiryValid}
          documentNumber={documentNumber}
          documentNumberChanged={documentNumberChanged}
          isDocumentNumberValid={isDocumentNumberValid}
          setDocumentNumberValid={setDocumentNumberValid}
          RNTRC={RNTRC}
          RNTRCChanged={RNTRCChanged}
          isRNTRCeValid={isRNTRCeValid}
          setRNTRCValid={setRNTRCValid}
          unitCode={unitCode}
          unitCodeChanged={unitCodeChanged}
          isUnitCodeValid={isUnitCodeValid}
          setUnitCodeValid={setUnitCodeValid}
          dateOfIssue={dateOfIssue}
          dateOfIssueChanged={dateOfIssueChanged}
          isDateOfIssueValid={isDateOfIssueValid}
          setDateOfIssueValid={setDateOfIssueValid}
          loginChanged={loginChanged}
          isLoginValid={isLoginValid}
          login={login}
          isNameValid={isNameValid}
          nameChanged={nameChanged}
          setNameValid={setNameValid}
          name={name}
          passwordChanged={passwordChanged}
          isPasswordValid={isPasswordValid}
          setPasswordValid={setPasswordValid}
          password={password}
          setLoginValid={setLoginValid}
        />
      </Form>
      <Message>
        Вже з нами?
        <NavLink exact to={AppRoute.LOGIN}>
          Увійти
        </NavLink>
      </Message>
    </>
  );
};

RegistrationForm.propTypes = {
  onRegister: PropTypes.func.isRequired
};

export default RegistrationForm;
