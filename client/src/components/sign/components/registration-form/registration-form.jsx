import * as React from 'react';
import PropTypes from 'prop-types';
import { UNIT_ADDRESS, UNIT_NAME } from 'src/common/constants/constants';
import { AppRoute } from 'src/common/enums/enums';
import { Form, Message, NavLink } from 'src/components/common/common';
import { auth as authService } from 'src/services/services';
import { SecondStep } from './components/components';

const RegistrationForm = ({ onRegister }) => {
  const [login, setLogin] = React.useState('');
  const [isLoginValid, setLoginValid] = React.useState(true);

  const [showError, setShowError] = React.useState(false);

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

  const [dateOfBirthday, setDateOfBirthday] = React.useState('');
  const [isDateOfBirthdayValid, dateOfBirthdayValid] = React.useState(true);

  const [isLoading, setLoading] = React.useState(false);

  const loginChanged = value => {
    setLogin(value);
    setLoginValid(true);
    setShowError(false);
  };

  const nameChanged = value => {
    setName(value);
    setNameValid(true);
    setShowError(false);
  };

  const passwordChanged = value => {
    setPassword(value);
    setPasswordValid(true);
    setShowError(false);
  };

  const surnameChanged = value => {
    setSurname(value);
    setSurnameValid(true);
    setShowError(false);
  };

  const patronymicChanged = value => {
    setPatronymic(value);
    setPatronymicValid(true);
    setShowError(false);
  };

  const seriesChanged = value => {
    setSeries(value);
    const regExp = new RegExp('^[??-??]', 'i');
    if (value) setSeriesValid(regExp.test(value) && value.length === 2);
    else setSeriesValid(true);
    setShowError(false);
  };

  const dateOfExpiryChanged = value => {
    setDateOfExpiry(value);
    setDateOfExpiryValid(true);
    setShowError(false);
  };

  const dateOfBirthdayChanged = value => {
    setDateOfBirthday(value);
    dateOfBirthdayValid(true);
    setShowError(false);
  };

  const dateOfIssueChanged = value => {
    setDateOfIssue(value);
    setDateOfIssueValid(true);
    setShowError(false);
  };

  const documentNumberChanged = value => {
    setDocumentNumber(value);
    const regExp = new RegExp('^[0-9]+$');
    setDocumentNumberValid(regExp.test(value) && value.length === 9);
    setShowError(false);
  };

  const RNTRCChanged = value => {
    setRNTRC(value);
    const regExp = new RegExp('^[0-9]+$');
    setRNTRCValid(regExp.test(value) && value.length === 10);
    setShowError(false);
  };

  const unitCodeChanged = value => {
    setUnitCode(value);
    setUnitCodeValid(true);
    setShowError(false);
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

      try {
        const data = await authService.registration({
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
          isActive: true,
          birthday: dateOfBirthday
        });

        if (data.status >= 400 && data.status < 500) {
          setShowError(true);
          setLoading(false);
          return;
        }

        await onRegister({
          login,
          password
        });
      } catch (err) {
        console.log(err);
      }
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
          showError={showError}
          isDateOfBirthdayValid={isDateOfBirthdayValid}
          dateOfBirthdayChanged={dateOfBirthdayChanged}
          dateOfBirthdayValid={dateOfBirthdayValid}
          dateOfBirthday={dateOfBirthday}
        />
      </Form>
      <Message>
        ?????? ?? ?????????
        <NavLink exact to={AppRoute.LOGIN}>
          ????????????
        </NavLink>
      </Message>
    </>
  );
};

RegistrationForm.propTypes = {
  onRegister: PropTypes.func.isRequired
};

export default RegistrationForm;
