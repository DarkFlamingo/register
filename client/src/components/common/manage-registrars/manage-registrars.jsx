import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, List } from 'src/components/common/common';
import { useAction } from 'src/hooks/useAction';
import styles from './styles.module.scss';

const ManageRegistrarsModal = ({ onClose }) => {
  const { registrars } = useSelector(state => ({
    registrars: state.people.registrars
  }));

  const { blockRegistrar, unblockRegistrar } = useAction();

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <List className={styles.list} divided relaxed>
          {registrars.map(el => (
            <div className={styles.item}>
              <List.Content>
                <List.Header as="a">{el.login}</List.Header>
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
            </div>
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
