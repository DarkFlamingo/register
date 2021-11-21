import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
import styles from './styles.module.scss';

const CheckBlankModal = ({ setOpen, checkBlank }) => {
  const [series, setSeries] = React.useState('');
  const [isSeriesValid, setSeriesValid] = React.useState(true);

  const [number, setNumber] = React.useState('');
  const [isNumberValid, setNumberValid] = React.useState(true);

  const checkNumber = value => {
    const regExp = new RegExp('^[0-9]+$');
    return regExp.test(value) && (value.length === 6 || value.length === 7);
  };

  const checkSeries = value => {
    const regExp = new RegExp('^[а-я]', 'i');
    return regExp.test(value) && (value.length === 2 || value.length === 3);
  };

  const checkNumberString = () => (isNumberValid ? false : '6 або 7 цифр');

  const checkSeriesString = () => (isSeriesValid ? false : 'Кирилиця 2 або 3 букви');

  const seriesChanged = value => {
    setSeriesValid(checkSeries(value));
    setSeries(value);
  };

  const numberChanged = value => {
    setNumberValid(checkNumber(value));
    setNumber(value);
  };

  const handleCheckBlank = () => {
    checkBlank({ series, number });
    setOpen(false);
  };

  return (
    <>
      <Modal.Header>Перевірка бланка</Modal.Header>
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
          onClick={handleCheckBlank}
          positive
          isDisabled={!(number && series && isSeriesValid && isNumberValid)}
        >
          Перевірка
        </Button>
      </Modal.Actions>
    </>
  );
};

CheckBlankModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
  checkBlank: PropTypes.func.isRequired
};

export default CheckBlankModal;
