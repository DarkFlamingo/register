/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'src/components/common/common';
import { registrar } from 'src/services/services';
import MakeRegistrar from '../make-registrar/make-registrar';
import styles from './styles.module.scss';

const ManageRegistrarsModal = ({ onClose }) => {
  const [users, setUsers] = React.useState([]);
  const [filter, setFilter] = React.useState({
    login: '',
    name: '',
    surname: '',
    patronymic: ''
  });
  const [open, setOpen] = React.useState(false);

  const changeFilter = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const getFilteredArray = usersArray => {
    return usersArray.filter(user => {
      const loginFiltered = filter.login
        ? user.login.includes(filter.login)
        : true;

      const nameFiltered = filter.name
        ? user.passport.name.includes(filter.name)
        : true;

      const surnameFiltered = filter.surname
        ? user.passport.surname.includes(filter.surname)
        : true;

      const patronymicFiltered = filter.patronymic
        ? user.passport.patronymic.includes(filter.patronymic)
        : true;

      return (
        loginFiltered && nameFiltered && surnameFiltered && patronymicFiltered
      );
    });
  };

  React.useEffect(async () => {
    const uploadUsers = await registrar.loadUsers();
    setUsers(uploadUsers);
  }, []);

  React.useEffect(async () => {
    const uploadUsers = await registrar.loadUsers();
    const filteredUsers = getFilteredArray(uploadUsers);
    setUsers(filteredUsers);
  }, [filter]);

  return (
    <div className={styles['modal-custom-users']}>
      <div className={styles['modal-content']}>
        <div className={styles['list-users']}>
          <table>
            <tr>
              <th>Логін</th>
              <th>Імя</th>
              <th>Прізвище</th>
              <th>Побатькові</th>
              <th>Дія</th>
            </tr>
            <tr>
              <th>
                <Form.Input
                  fluid
                  placeholder="Логін"
                  onChange={ev => changeFilter('login', ev.target.value)}
                  value={filter.login}
                />
              </th>
              <th>
                <Form.Input
                  fluid
                  placeholder="Імя"
                  onChange={ev => changeFilter('name', ev.target.value)}
                  value={filter.name}
                />
              </th>
              <th>
                <Form.Input
                  fluid
                  placeholder="Прізвище"
                  onChange={ev => changeFilter('surname', ev.target.value)}
                  value={filter.surname}
                />
              </th>
              <th>
                <Form.Input
                  fluid
                  placeholder="Побатькові"
                  onChange={ev => changeFilter('patronymic', ev.target.value)}
                  value={filter.patronymic}
                />
              </th>
              <th></th>
            </tr>
            {users &&
              users.map(el => (
                <tr key={el.id}>
                  <td>{el.login}</td>
                  <td>{el.passport.name}</td>
                  <td>{el.passport.surname}</td>
                  <td>{el.passport.patronymic}</td>
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
