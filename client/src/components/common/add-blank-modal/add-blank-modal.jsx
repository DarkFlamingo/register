import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
import { blank as blankService } from 'src/services/services';
import styles from './styles.module.scss';

const CheckBlankModal = ({ setOpen, addBlank }) => {
  const [series, setSeries] = React.useState('');
  const [isSeriesValid, setSeriesValid] = React.useState(true);

  const [number, setNumber] = React.useState('');
  const [isNumberValid, setNumberValid] = React.useState(true);

  const [error, setError] = React.useState(false);

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
    setError(false);
  };

  const numberChanged = value => {
    setNumberValid(checkNumber(value));
    setNumber(value);
    setError(false);
  };

  const handleAddBlank = async () => {
    const data = await blankService.checkBlank({ series, number });
    if (data.isExist) {
      setError(true);
    } else {
      addBlank({
        series,
        number,
        createdDate: Date.now()
      });
      setOpen(false);
    }
  };

  return (
    <>
      <Modal.Header>Додавання бланка</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form name="checkBlankForm" size="large">
            <div className={styles['input-wrapper']}>
              <div className={styles['input-item']}>
                <span>Серія бланку</span>
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="Серія"
                  error={checkSeriesString()}
                  onChange={ev => seriesChanged(ev.target.value)}
                  onBlur={() => setSeriesValid(checkSeries(series))}
                  value={series}
                />
              </div>
              <div className={styles['input-item']}>
                <span>Номер бланку</span>
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="Номер"
                  error={checkNumberString()}
                  onChange={ev => numberChanged(ev.target.value)}
                  onBlur={() => setNumberValid(checkNumber(number))}
                  value={number}
                />
              </div>
            </div>
          </Form>
          {error && (<div className={styles['error-add-label']}>Такий бланк уже існує</div>)}
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
