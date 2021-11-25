import * as React from 'react';
import PropTypes from 'prop-types';
import { ButtonType, ButtonSize, ButtonColor } from 'src/common/enums/enums';
import { Button, Form, Segment } from 'src/components/common/common';
import styles from './styles.module.scss';

const FirstStep = ({
  isLoading,
  previousStepClick,
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
  dateOfExpiry,
  dateOfExpiryChanged,
  isDateOfExpiryValid,
  setDateOfExpiryValid,
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
  unitName,
  unitNameChanged,
  isUnitNameValid,
  setUnitNameValid,
  dateOfIssue,
  dateOfIssueChanged,
  isDateOfIssueValid,
  setDateOfIssueValid,
  unitAdress,
  unitAdressChanged,
  isUnitAdressValid,
  setUnitAdressValid
}) => (
  <Segment className={styles['registration-wrapper']}>
    <h2 className={styles.title}>Зареєструй свій аккаунт</h2>
    <Form.Input
      fluid
      iconPosition="left"
      placeholder="Прізвище"
      error={!isSurnameValid}
      onChange={ev => surnameChanged(ev.target.value)}
      onBlur={() => setSurnameValid(Boolean(surname))}
      value={surname}
    />
    <Form.Input
      fluid
      iconPosition="left"
      placeholder="По батькові"
      error={!isPatronymicValid}
      onChange={ev => patronymicChanged(ev.target.value)}
      onBlur={() => setPatronymicValid(Boolean(patronymic))}
      value={patronymic}
    />
    <Form.Input
      fluid
      iconPosition="left"
      placeholder="Серія"
      error={!isSeriesValid}
      onChange={ev => seriesChanged(ev.target.value)}
      onBlur={() => setSeriesValid(Boolean(series))}
      value={series}
    />
    <Form.Input
      fluid
      iconPosition="left"
      type="date"
      placeholder="Дата видачі"
      error={!isDateOfExpiryValid}
      onChange={ev => dateOfExpiryChanged(ev.target.value)}
      onBlur={() => setDateOfExpiryValid(Boolean(dateOfExpiry))}
      value={dateOfExpiry}
    />
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
    <Form.Input
      fluid
      iconPosition="left"
      placeholder="Номер"
      error={!isDocumentNumberValid}
      onChange={ev => documentNumberChanged(ev.target.value)}
      onBlur={() => setDocumentNumberValid(Boolean(documentNumber))}
      value={documentNumber}
    />
    <Form.Input
      fluid
      iconPosition="left"
      placeholder="RNTRC"
      error={!isRNTRCeValid}
      onChange={ev => RNTRCChanged(ev.target.value)}
      onBlur={() => setRNTRCValid(Boolean(RNTRC))}
      value={RNTRC}
    />
    <Form.Input
      fluid
      iconPosition="left"
      placeholder="Огран що видав(код)"
      error={!isUnitCodeValid}
      onChange={ev => unitCodeChanged(ev.target.value)}
      onBlur={() => setUnitCodeValid(Boolean(unitCode))}
      value={unitCode}
    />
    <Form.Input
      fluid
      iconPosition="left"
      placeholder="Огран що видав(назва)"
      error={!isUnitNameValid}
      onChange={ev => unitNameChanged(ev.target.value)}
      onBlur={() => setUnitNameValid(Boolean(unitName))}
      value={unitName}
    />
    <Form.Input
      fluid
      iconPosition="left"
      placeholder="Огран що видав(адреса)"
      error={!isUnitAdressValid}
      onChange={ev => unitAdressChanged(ev.target.value)}
      onBlur={() => setUnitAdressValid(Boolean(unitAdress))}
      value={unitAdress}
    />
    <div className={styles['btn-wrapper']}>
      <Button
        type={ButtonType.SUBMIT}
        color={ButtonColor.TEAL}
        size={ButtonSize.LARGE}
        isLoading={isLoading}
        isFluid
        isPrimary
        onClick={previousStepClick}
      >
        Попередня
      </Button>
      <Button
        type={ButtonType.SUBMIT}
        color={ButtonColor.TEAL}
        size={ButtonSize.LARGE}
        isLoading={isLoading}
        isFluid
        isPrimary
      >
        Зареєструватись
      </Button>
    </div>
  </Segment>
);

FirstStep.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  previousStepClick: PropTypes.func.isRequired,
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
  dateOfExpiry: PropTypes.string.isRequired,
  dateOfExpiryChanged: PropTypes.func.isRequired,
  isDateOfExpiryValid: PropTypes.bool.isRequired,
  setDateOfExpiryValid: PropTypes.func.isRequired,
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
  unitName: PropTypes.string.isRequired,
  unitNameChanged: PropTypes.func.isRequired,
  isUnitNameValid: PropTypes.bool.isRequired,
  setUnitNameValid: PropTypes.func.isRequired,
  dateOfIssue: PropTypes.string.isRequired,
  dateOfIssueChanged: PropTypes.func.isRequired,
  isDateOfIssueValid: PropTypes.bool.isRequired,
  setDateOfIssueValid: PropTypes.func.isRequired,
  unitAdress: PropTypes.string.isRequired,
  unitAdressChanged: PropTypes.func.isRequired,
  isUnitAdressValid: PropTypes.bool.isRequired,
  setUnitAdressValid: PropTypes.func.isRequired
};

export default FirstStep;
