/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Select } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
import { ISSUE_CODE } from 'src/common/constants/constants';
import styles from './styles.module.scss';

const CheckBlankModal = ({ setOpen, addBlank }) => {
  const [series, setSeries] = React.useState('');
  const [isSeriesValid, setSeriesValid] = React.useState(true);

  const [number, setNumber] = React.useState('');
  const [isNumberValid, setNumberValid] = React.useState(true);

  const [issueDate, setIssueDate] = React.useState('');

  const [option, setOption] = React.useState(null);

  const checkNumber = value => {
    const regExp = new RegExp('^[0-9]+$');
    return regExp.test(value) && (value.length === 6 || value.length === 7);
  };

  const checkSeries = value => {
    const regExp = new RegExp('^[а-я]', 'i');
    return regExp.test(value) && (value.length === 2 || value.length === 3);
  };

  const checkNumberString = () => (isNumberValid ? false : '6 або 7 цифр');

  const checkSeriesString = () =>
    isSeriesValid ? false : 'Кирилиця 2 або 3 букви';

  const seriesChanged = value => {
    setSeriesValid(checkSeries(value));
    setSeries(value);
  };

  const numberChanged = value => {
    setNumberValid(checkNumber(value));
    setNumber(value);
  };

  const handleAddBlank = () => {
    if (option) {
      addBlank({
        series,
        number,
        issueDate,
        code: option.code,
        name: option.name
      });
    } else {
      addBlank({ series, number, issueDate });
    }
    setOpen(false);
  };

  const getOptions = () => {
    return Object.entries(ISSUE_CODE).map(([key, value]) => ({
      value: { code: key, name: value },
      label: value.length > 30 ? `${value.slice(0, 30)}...` : value
    }));
  };

  return (
    <>
      <Modal.Header>Додавання бланка</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form name="checkBlankForm" size="large">
            <div className={styles['input-wrapper']}>
              <Form.Input
                className={styles['input-item']}
                fluid
                iconPosition="left"
                placeholder="Серія"
                error={checkSeriesString()}
                onChange={ev => seriesChanged(ev.target.value)}
                onBlur={() => setSeriesValid(checkSeries(series))}
                value={series}
              />
              <Form.Input
                className={styles['input-item']}
                fluid
                iconPosition="left"
                placeholder="Номер"
                error={checkNumberString()}
                onChange={ev => numberChanged(ev.target.value)}
                onBlur={() => setNumberValid(checkNumber(number))}
                value={number}
              />
              <Form.Input
                className={styles['input-item-date']}
                fluid
                type="date"
                iconPosition="left"
                placeholder="Дата витрачання"
                onChange={ev => setIssueDate(ev.target.value)}
                value={issueDate}
              />
              <Select
                options={getOptions()}
                onChange={obj => setOption(obj.value)}
              />
            </div>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className={styles['btn-wrapper']}>
        <Button color="black" onClick={() => setOpen(false)}>
          Закрити
        </Button>
        <Button
          type={ButtonType.SUBMIT}
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={handleAddBlank}
          positive
          isDisabled={!(number && series && isSeriesValid && isNumberValid)}
        >
          Додати
        </Button>
      </Modal.Actions>
    </>
  );
};

CheckBlankModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
  addBlank: PropTypes.func.isRequired
};

export default CheckBlankModal;
