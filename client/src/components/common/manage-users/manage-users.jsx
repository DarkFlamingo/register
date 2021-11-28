import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'src/components/common/common';
import MakeRegistrar from '../make-registrar/make-registrar';
import styles from './styles.module.scss';

const ManageRegistrarsModal = ({ onClose }) => {
  const { users } = useSelector(state => ({
    users: state.people.users
  }));

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <div className={styles['list-users']}>
          <table>
            <tr>
              <th>Логін</th>
              <th>Дія</th>
            </tr>
            {users.map(el => (
              <tr key={el.id}>
                <td>{el.login}</td>
                <td>
                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button>Зареєструвати реєстратора</Button>}
                  >
                    <MakeRegistrar setOpen={setOpen} id={el.id} />
                  </Modal>
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
