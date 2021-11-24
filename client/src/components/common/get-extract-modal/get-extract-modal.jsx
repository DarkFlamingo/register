/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useAction } from 'src/hooks/useAction';
import { Modal, Button, Form } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
import { extract as extractService } from 'src/services/services';
import styles from './styles.module.scss';

const CheckBlankModal = ({ setOpen }) => {
  const { setExtract } = useAction();

  const [series, setSeries] = React.useState('');
  const [isSeriesValid, setSeriesValid] = React.useState(true);

  const [number, setNumber] = React.useState('');
  const [isNumberValid, setNumberValid] = React.useState(true);

  const [code, setCode] = React.useState(1);

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

  const handleAddBlank = async () => {
    let data = null;
    if (series) {
      if (number) {
        if (code) {
          data = await extractService.getExtract({ series, number, code });
        } else {
          data = await extractService.getExtract({ series, number });
        }
      }

      if (code) {
        data = await extractService.getExtract({ series, code });
      } else {
        data = await extractService.getExtract({ series });
      }
    } else {
      if (number) {
        if (code) {
          data = await extractService.getExtract({ code, number });
        } else {
          data = await extractService.getExtract({ number });
        }
      } else if (code) {
        data = await extractService.getExtract({ code });
      }
    }
    setExtract(data);
  };

  return (
    <>
      <Modal.Header>Отримати витяг</Modal.Header>
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
                className={styles['input-item']}
                fluid
                type="number"
                iconPosition="left"
                placeholder="Код витрачання"
                onChange={ev => setCode(ev.target.value)}
                value={code}
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
          isDisabled={
            !((number && isNumberValid) || (series && isSeriesValid) || code)
          }
        >
          Отримати
        </Button>
      </Modal.Actions>
    </>
  );
};

CheckBlankModal.propTypes = {
  setOpen: PropTypes.func.isRequired
};

export default CheckBlankModal;
