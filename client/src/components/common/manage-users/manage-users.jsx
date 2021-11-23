import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, List, Modal } from 'src/components/common/common';
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
        <List className={styles.list} divided relaxed>
          {users.map(el => (
            <List.Item key={el.id} className={styles.item}>
              <List.Content>
                <List.Header as="a">{el.login}</List.Header>
              </List.Content>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Зареєструвати реєстратора</Button>}
              >
                <MakeRegistrar setOpen={setOpen} id={el.id} />
              </Modal>
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
