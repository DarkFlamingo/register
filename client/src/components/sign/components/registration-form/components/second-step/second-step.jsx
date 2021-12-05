/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { ButtonType, ButtonSize, ButtonColor } from 'src/common/enums/enums';
import { UNIT_CODE } from 'src/common/constants/constants';
import { Button, Form, Segment, Select } from 'src/components/common/common';
import styles from './styles.module.scss';

const FirstStep = ({
  register,
  isLoading,
  surname,
  surnameChanged,
  isSurnameValid,
  setSurnameValid,
  patronymic,
  patronymicChanged,
  isPatronymicValid,
  setPatronymicValid,
  series,
  seriesChanged,
  isSeriesValid,
  setSeriesValid,
  documentNumber,
  documentNumberChanged,
  isDocumentNumberValid,
  setDocumentNumberValid,
  RNTRC,
  RNTRCChanged,
  isRNTRCeValid,
  setRNTRCValid,
  unitCode,
  unitCodeChanged,
  isUnitCodeValid,
  setUnitCodeValid,
  dateOfIssue,
  dateOfIssueChanged,
  isDateOfIssueValid,
  setDateOfIssueValid,
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
  setLoginValid
}) => {
  const getOptions = arrayOfStrings =>
    arrayOfStrings.map(str => ({ label: str, value: str }));

  return (
    <Segment className={styles['registration-wrapper']}>
      <h2 className={styles.title}>Зареєструй свій аккаунт</h2>
      <div className={styles['input-wrapper']}>
        <div className={styles['input-column']}>
          <div className={styles['input-container']}>
            <label>Логін</label>
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="Логін"
              type="email"
              error={!isLoginValid}
              onChange={ev => loginChanged(ev.target.value)}
              onBlur={() => setLoginValid(Boolean(login))}
              value={login}
            />
          </div>
          <div className={styles['input-container']}>
            <label>{"І'мя"}</label>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="І'мя"
              type="text"
              error={!isNameValid}
              onChange={ev => nameChanged(ev.target.value)}
              onBlur={() => setNameValid(Boolean(name))}
              value={name}
            />
          </div>
          <div className={styles['input-container']}>
            <label>Пароль</label>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Пароль"
              type="password"
              onChange={ev => passwordChanged(ev.target.value)}
              error={!isPasswordValid}
              onBlur={() => setPasswordValid(Boolean(password))}
              value={password}
            />
          </div>
          <div className={styles['input-container']}>
            <label>Прізвище</label>
            <Form.Input
              fluid
              iconPosition="left"
              placeholder="Прізвище"
              error={!isSurnameValid}
              onChange={ev => surnameChanged(ev.target.value)}
              onBlur={() => setSurnameValid(Boolean(surname))}
              value={surname}
            />
          </div>
          <div className={styles['input-container']}>
            <label>По батькові</label>
            <Form.Input
              fluid
              iconPosition="left"
              placeholder="По батькові"
              error={!isPatronymicValid}
              onChange={ev => patronymicChanged(ev.target.value)}
              onBlur={() => setPatronymicValid(Boolean(patronymic))}
              value={patronymic}
            />
          </div>
        </div>
        <div className={styles['input-column']}>
          <div className={styles['input-container']}>
            <label>Серія паспорту</label>
            <Form.Input
              fluid
              iconPosition="left"
              placeholder="Серія"
              error={!isSeriesValid}
              onChange={ev => seriesChanged(ev.target.value)}
              onBlur={() => setSeriesValid(true)}
              value={series}
            />
          </div>
          <div className={styles['input-container']}>
            <label>Дата видачі паспорту</label>
            <Form.Input
              fluid
              iconPosition="left"
              type="date"
              placeholder="Дата закінчення"
              error={!isDateOfIssueValid}
              onChange={ev => dateOfIssueChanged(ev.target.value)}
              onBlur={() => setDateOfIssueValid(Boolean(dateOfIssue))}
              value={dateOfIssue}
            />
          </div>
          <div className={styles['input-container']}>
            <label>Номер паспорту</label>
            <Form.Input
              fluid
              iconPosition="left"
              placeholder="Номер"
              error={!isDocumentNumberValid}
              onChange={ev => documentNumberChanged(ev.target.value)}
              onBlur={() => {
                const regExp = new RegExp('^[0-9]+$');
                setDocumentNumberValid(regExp.test(documentNumber));
              }}
              value={documentNumber}
            />
          </div>
          <div className={styles['input-container']}>
            <label>RNTRC</label>
            <Form.Input
              fluid
              iconPosition="left"
              placeholder="RNTRC"
              error={!isRNTRCeValid}
              onChange={ev => RNTRCChanged(ev.target.value)}
              onBlur={() => {
                const regExp = new RegExp('^[0-9]+$');
                setRNTRCValid(regExp.test(RNTRC) && RNTRC.length === 10);
              }}
              value={RNTRC}
            />
          </div>
          <div className={styles['input-container']}>
            <label>Код органа, що видав</label>
            <Select options={getOptions(UNIT_CODE)} onChange={obj => unitCodeChanged(obj.value)}/>
          </div>
        </div>
      </div>
      <div className={styles['btn-wrapper']}>
        <Button
          type={ButtonType.SUBMIT}
          color={ButtonColor.TEAL}
          size={ButtonSize.LARGE}
          isLoading={isLoading}
          onClick={register}
          isFluid
          isPrimary
          isDisabled={
            !(
              login &&
              name &&
              surname &&
              password &&
              patronymic &&
              dateOfIssue &&
              documentNumber &&
              RNTRC &&
              unitCode &&
              isUnitCodeValid &&
              isRNTRCeValid &&
              isDocumentNumberValid &&
              isDateOfIssueValid &&
              isSeriesValid &&
              isPatronymicValid &&
              isSurnameValid &&
              isPasswordValid &&
              isNameValid &&
              isLoginValid
            )
          }
        >
          Зареєструватись
        </Button>
      </div>
    </Segment>
  );
};
FirstStep.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  surname: PropTypes.string.isRequired,
  surnameChanged: PropTypes.func.isRequired,
  isSurnameValid: PropTypes.bool.isRequired,
  setSurnameValid: PropTypes.func.isRequired,
  patronymic: PropTypes.string.isRequired,
  patronymicChanged: PropTypes.func.isRequired,
  isPatronymicValid: PropTypes.bool.isRequired,
  setPatronymicValid: PropTypes.func.isRequired,
  series: PropTypes.string.isRequired,
  seriesChanged: PropTypes.func.isRequired,
  isSeriesValid: PropTypes.bool.isRequired,
  setSeriesValid: PropTypes.func.isRequired,
  documentNumber: PropTypes.string.isRequired,
  documentNumberChanged: PropTypes.func.isRequired,
  isDocumentNumberValid: PropTypes.bool.isRequired,
  setDocumentNumberValid: PropTypes.func.isRequired,
  RNTRC: PropTypes.string.isRequired,
  RNTRCChanged: PropTypes.func.isRequired,
  isRNTRCeValid: PropTypes.bool.isRequired,
  setRNTRCValid: PropTypes.func.isRequired,
  unitCode: PropTypes.string.isRequired,
  unitCodeChanged: PropTypes.func.isRequired,
  isUnitCodeValid: PropTypes.bool.isRequired,
  setUnitCodeValid: PropTypes.func.isRequired,
  dateOfIssue: PropTypes.string.isRequired,
  dateOfIssueChanged: PropTypes.func.isRequired,
  isDateOfIssueValid: PropTypes.bool.isRequired,
  setDateOfIssueValid: PropTypes.func.isRequired,
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
  setLoginValid: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default FirstStep;
