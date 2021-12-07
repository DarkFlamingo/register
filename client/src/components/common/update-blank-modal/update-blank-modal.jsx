/* eslint-disable */
import * as React from 'react';
import { Modal, Button, Form } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
import { blank as blankService } from 'src/services/services';
import styles from './styles.module.scss';

const UpdateBlankModal = ({ setOpen, updateBlank, blank }) => {
  const [series, setSeries] = React.useState(blank.series);
  const [isSeriesValid, setSeriesValid] = React.useState(true);

  const [number, setNumber] = React.useState(blank.number);
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

  const checkSeriesString = () =>
    isSeriesValid ? false : 'Кирилиця 2 або 3 букви';

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

  const handleUpdateBlank = async () => {
    const data = await blankService.checkBlank({ series, number });
    if (data.isExist) {
      setError(true);
    } else {
      updateBlank({
        id: blank.id,
        series,
        number
      });
      setOpen(null);
    }
  };

  return (
    <div className={styles['update-wrapper']}>
      <Modal.Header>
        <h3>Оновлення бланка</h3>
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form name="checkBlankForm" size="large">
            <div className={styles['input-wrapper']}>
              <div className={styles['input-item']}>
                <label>Серія бланку</label>
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
                <label>Номер бланку</label>
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
        <Button color="black" onClick={() => setOpen(null)}>
          Закрити
        </Button>
        <Button
          type={ButtonType.SUBMIT}
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={handleUpdateBlank}
          positive
          isDisabled={!(number && series && isSeriesValid && isNumberValid)}
        >
          Оновити
        </Button>
      </Modal.Actions>
    </div>
  );
};

export default UpdateBlankModal;
