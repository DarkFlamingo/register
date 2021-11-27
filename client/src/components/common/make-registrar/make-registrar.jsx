/* eslint-disable */
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Select } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
import {
  ORGANIZATION_NAMES,
  POSITION_NAMES
} from 'src/common/constants/constants';
import { useAction } from 'src/hooks/useAction';
import styles from './styles.module.scss';

const MakeRegistrar = ({ setOpen, id }) => {
  const [address, setAddress] = useState('');
  const [positionName, setPositionName] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  const { makeRegistrar } = useAction();

  const checkString = str => (!str ? 'Не може бути порожнім' : false);

  const handleMakeRegistrar = () => {
    makeRegistrar({ id, data: { address, positionName, organizationName } });
  };

  const getOptions = arrayOfStrings =>
    arrayOfStrings.map(str => ({ label: str, value: str }));

  return (
    <>
      <Modal.Header>Зареєструвати реєстратора</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form name="checkBlankForm" size="large">
            <div className={styles['input-wrapper']}>
              <div className={styles['data-input-wrapper']}>
                <label>Адреса організації</label>
                <Form.Input
                  className={styles['input-item']}
                  fluid
                  placeholder="Адреса"
                  error={checkString(address)}
                  onChange={ev => setAddress(ev.target.value)}
                  value={address}
                />
              </div>
              <div className={styles['data-input-wrapper']}>
                <label>Назва організації</label>
                <Select
                  className={styles['select-something']}
                  options={getOptions(ORGANIZATION_NAMES)}
                  onChange={obj => setOrganizationName(obj.value)}
                />
              </div>
              <div className={styles['data-input-wrapper']}>
                <label>Посада</label>
                <Select
                  className={styles['select-something']}
                  options={getOptions(POSITION_NAMES)}
                  onChange={obj => setPositionName(obj.value)}
                />
              </div>
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
          onClick={handleMakeRegistrar}
          positive
          isDisabled={!(address && positionName && organizationName)}
        >
          Зареєструвати
        </Button>
      </Modal.Actions>
    </>
  );
};

MakeRegistrar.propTypes = {
  setOpen: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default MakeRegistrar;
