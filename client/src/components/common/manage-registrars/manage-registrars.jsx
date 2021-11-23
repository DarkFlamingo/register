import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, List } from 'src/components/common/common';
import { useAction } from 'src/hooks/useAction';
import styles from './styles.module.scss';

const ManageRegistrarsModal = ({ onClose }) => {
  const { registrars } = useSelector(state => ({
    registrars: state.registrar.registrars
  }));

  const { blockRegistrar, unblockRegistrar } = useAction();

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <List className={styles.list} divided relaxed>
          {registrars.map(el => (
            <List.Item key={el.id} className={styles.item}>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{el.name}</List.Header>
                <List.Description as="a">Updated 10 mins ago</List.Description>
              </List.Content>
              {el.isActive ? (
                <Button
                  className={styles['button-unblocked']}
                  onClick={() => blockRegistrar(el.id)}
                >
                  Заблокувати
                </Button>
              ) : (
                <Button
                  className={styles['button-blocked']}
                  onClick={() => unblockRegistrar(el.id)}
                >
                  Розблокувати
                </Button>
              )}
            </List.Item>
          ))}
        </List>
        <Button onClick={onClose}>Вихід</Button>
      </div>
    </div>
  );
};

ManageRegistrarsModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ManageRegistrarsModal;
