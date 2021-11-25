import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
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

  return (
    <>
      <Modal.Header>Зареєструвати реєстратора</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form name="checkBlankForm" size="large">
            <div className={styles['input-wrapper']}>
              <Form.Input
                className={styles['input-item']}
                fluid
                placeholder="Адреса"
                error={checkString(address)}
                onChange={ev => setAddress(ev.target.value)}
                value={address}
              />
              <Form.Input
                className={styles['input-item']}
                fluid
                placeholder="Позиція"
                error={checkString(positionName)}
                onChange={ev => setPositionName(ev.target.value)}
                value={positionName}
              />
              <Form.Input
                className={styles['input-item']}
                fluid
                placeholder="Організація"
                error={checkString(organizationName)}
                onChange={ev => setOrganizationName(ev.target.value)}
                value={organizationName}
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
