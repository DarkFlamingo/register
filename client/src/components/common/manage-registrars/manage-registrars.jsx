import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/common/common';
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
        <div className={styles.list}>
          <table>
            <tr>
              <th>Логін</th>
              <th>Статус</th>
            </tr>
            {registrars.map(el => (
              <tr key={el.id} className={styles.item}>
                <td>{el.login}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </table>
        </div>

        <Button onClick={onClose}>Вихід</Button>
      </div>
    </div>
  );
};

ManageRegistrarsModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ManageRegistrarsModal;
