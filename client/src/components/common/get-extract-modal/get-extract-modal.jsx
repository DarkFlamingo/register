/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useAction } from 'src/hooks/useAction';
import { Modal, Button, Form } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
import { extract as extractService } from 'src/services/services';
import './styles.scss';

const CheckBlankModal = ({ setOpen }) => {
  const { setExtract } = useAction();

  const [series, setSeries] = React.useState('');
  const [isSeriesValid, setSeriesValid] = React.useState(true);

  const [number, setNumber] = React.useState('');
  const [isNumberValid, setNumberValid] = React.useState(true);

  const [name, setName] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(true);

  const [surname, setSurname] = React.useState('');
  const [isSurnameValid, setIsSurnameValid] = React.useState(true);

  const [patronymic, setPatronymic] = React.useState('');
  const [isPatronymicValid, setIsPatronymicValid] = React.useState(true);

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

  const nameChanged = value => {
    setIsNameValid(value);
    setName(value);
  };

  const surnameChanged = value => {
    setIsSurnameValid(value);
    setSurname(value);
  };

  const patronymicChanged = value => {
    setIsPatronymicValid(value);
    setPatronymic(value);
  };

  const handleAddBlank = async () => {
    let data = null;
    if (series) {
      if (number) {
        data = await extractService.getExtract({ series, number });
      } else {
        data = await extractService.getExtract({ series });
      }
    } else {
      if (number) {
        data = await extractService.getExtract({ number });
      }
    }
    console.log(data);
    setExtract({ ...data, receiver: { name, surname, patronymic } });
  };

  return (
    <>
      <Modal.Header>Отримати витяг</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form name="checkBlankForm" size="large">
            <div className={'input-wrapper'}>
              <div className={'input-item'}>
                <span>Прізвище</span>
                <Form.Input
                  fluid
                  placeholder="Прізвище"
                  onChange={ev => surnameChanged(ev.target.value)}
                  onBlur={() => setIsSurnameValid(surname)}
                  value={surname}
                />
              </div>
              <div className={'input-item'}>
                <span>Імя</span>
                <Form.Input
                  fluid
                  placeholder="Імя"
                  onChange={ev => nameChanged(ev.target.value)}
                  onBlur={() => setIsNameValid(name)}
                  value={name}
                />
              </div>
              <div className={'input-item'}>
                <span>Побатькові</span>
                <Form.Input
                  fluid
                  placeholder="Побатькові"
                  onChange={ev => patronymicChanged(ev.target.value)}
                  onBlur={() => setIsPatronymicValid(patronymic)}
                  value={patronymic}
                />
              </div>
            </div>
            <div className={'input-wrapper'}>
              <div className={'input-item'}>
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
              <div className={'input-item'}>
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
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className={'btn-wrapper'}>
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
            !(
              number &&
              isNumberValid &&
              series &&
              isSeriesValid &&
              name &&
              isNameValid &&
              surname &&
              isSurnameValid &&
              patronymic &&
              isPatronymicValid
            )
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
