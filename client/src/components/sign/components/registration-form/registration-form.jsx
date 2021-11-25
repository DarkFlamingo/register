import * as React from 'react';
import PropTypes from 'prop-types';
import { AppRoute } from 'src/common/enums/enums';
import { Form, Message, NavLink } from 'src/components/common/common';
import { FirstStep, SecondStep } from './components/components';

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

  const [unitName, setUnitName] = React.useState('');
  const [isUnitNameValid, setUnitNameValid] = React.useState(true);

  const [unitAdress, setUnitAdress] = React.useState('');
  const [isUnitAdressValid, setUnitAdressValid] = React.useState(true);

  const [isLoading, setLoading] = React.useState(false);
  const [isFirstPage, setIsFirstPage] = React.useState(true);

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
    setSurnameValid(true);
  };

  const seriesChanged = value => {
    setSeries(value);
    setSurnameValid(true);
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
    setDocumentNumberValid(true);
  };

  const RNTRCChanged = value => {
    setRNTRC(value);
    setRNTRCValid(true);
  };

  const unitCodeChanged = value => {
    setUnitCode(value);
    setUnitCodeValid(true);
  };

  const unitNameChanged = value => {
    setUnitName(value);
    setUnitNameValid(true);
  };

  const unitAdressChanged = value => {
    setUnitAdress(value);
    setUnitAdressValid(true);
  };

  const register = async () => {
    const isValid = isLoginValid && isNameValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setLoading(true);
    try {
      await onRegister({
        login,
        password,
        name,
        surname,
        patronymic,
        series,
        dateOfExpiry,
        dateOfIssue,
        documentNumber,
        RNTRC,
        unitCode,
        unitName,
        unitAddress: unitAdress,
        isActive: true
      });
    } catch {
      setLoading(false);
    }
  };

  const nextStepClick = () => {
    setIsFirstPage(false);
  };

  const previousStepClick = () => {
    setIsFirstPage(true);
  };

  return (
    <>
      <Form name="registrationForm" size="large" onSubmit={register}>
        {isFirstPage ? (
          <FirstStep
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
            isLoading={isLoading}
            setLoginValid={setLoginValid}
            nextStepClick={nextStepClick}
          />
        ) : (
          <SecondStep
            isLoading={isLoading}
            previousStepClick={previousStepClick}
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
            unitName={unitName}
            unitNameChanged={unitNameChanged}
            isUnitNameValid={isUnitNameValid}
            setUnitNameValid={setUnitNameValid}
            dateOfIssue={dateOfIssue}
            dateOfIssueChanged={dateOfIssueChanged}
            isDateOfIssueValid={isDateOfIssueValid}
            setDateOfIssueValid={setDateOfIssueValid}
            unitAdress={unitAdress}
            unitAdressChanged={unitAdressChanged}
            isUnitAdressValid={isUnitAdressValid}
            setUnitAdressValid={setUnitAdressValid}
          />
        )}
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
