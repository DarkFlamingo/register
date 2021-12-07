/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'src/components/common/common';
import { registrar } from 'src/services/services';
import styles from './styles.module.scss';

const ManageRegistrarsModal = ({ onClose }) => {
  const [registrars, setResistars] = React.useState([]);
  const [filter, setFilter] = React.useState({
    login: '',
    name: '',
    surname: '',
    positionName: '',
    organizationName: ''
  });
  const [passport, setPassport] = React.useState(null);

  const changeFilter = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const getFilteredArray = registararsArray => {
    return registararsArray.filter(item => {
      const loginFiltered = filter.login
        ? item.login.includes(filter.login)
        : true;

      const nameFiltered = filter.name
        ? item.passport.name.includes(filter.name)
        : true;

      const surnameFiltered = filter.surname
        ? item.passport.surname.includes(filter.surname)
        : true;

      const positionNameFiltered = filter.positionName
        ? item.position.positionName.includes(filter.positionName)
        : true;

      const organizationNameFiltered = filter.organizationName
        ? item.organization.organizationName.includes(filter.organizationName)
        : true;

      return (
        loginFiltered &&
        nameFiltered &&
        surnameFiltered &&
        positionNameFiltered &&
        organizationNameFiltered
      );
    });
  };

  React.useEffect(async () => {
    const uploadRegistrar = await registrar.loadRegistrars();
    setResistars(uploadRegistrar);
  }, []);

  React.useEffect(async () => {
    const uploadRegistrar = await registrar.loadRegistrars();
    const filteredArray = getFilteredArray(uploadRegistrar);
    setResistars(filteredArray);
  }, [filter]);

  const blockRegistrar = async id => {
    await registrar.blockRegistrar(id);
    const uploadRegistrar = await registrar.loadRegistrars();
    const filteredArray = getFilteredArray(uploadRegistrar);
    setResistars(filteredArray);
  };

  const unblockRegistrar = async id => {
    await registrar.unblockRegistrar(id);
    const uploadRegistrar = await registrar.loadRegistrars();
    const filteredArray = getFilteredArray(uploadRegistrar);
    setResistars(filteredArray);
  };

  return (
    <div className={styles['modal-custom-registrar']}>
      {passport && (
        <div className={styles['modal-custom-registrar']}>
          <div className={styles['passport-table-content']}>
            <div className={styles.list}>
              <table>
                <tr>
                  <th>{`Ім'я`}</th>
                  <td>{passport.name}</td>
                </tr>
                <tr>
                  <th>Прізвище</th>
                  <td>{passport.surname}</td>
                </tr>
                <tr>
                  <th>По батькові</th>
                  <td>{passport.patronymic}</td>
                </tr>
                <tr>
                  <th>Дата народження</th>
                  <td>{passport.birthday}</td>
                </tr>
                <tr>
                  <th>Номер паспорту</th>
                  <td>{passport.documentNumber}</td>
                </tr>
                <tr>
                  <th>РНОКПП</th>
                  <td>{passport.RNTRC}</td>
                </tr>
              </table>

              <Button onClick={() => setPassport(null)}>Вихід</Button>
            </div>
          </div>
        </div>
      )}
      <div className={styles['modal-content']}>
        <div className={styles.list}>
          <table>
            <tr>
              <th>Логін</th>
              <th>Імя</th>
              <th>Прізвище</th>
              <th>Посада</th>
              <th>Організація</th>
              <th>Паспортні дані</th>
              <th>Статус</th>
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
                  placeholder="Посада"
                  onChange={ev => changeFilter('positionName', ev.target.value)}
                  value={filter.positionName}
                />
              </th>
              <th>
                <Form.Input
                  fluid
                  placeholder="Організація"
                  onChange={ev =>
                    changeFilter('organizationName', ev.target.value)
                  }
                  value={filter.organizationName}
                />
              </th>
              <th></th>
              <th></th>
            </tr>
            {registrars && //eslint-disable-line
              registrars.map(el => (
                <tr key={el.id} className={styles.item}>
                  <td>{el.login}</td>
                  <td>{el.passport.name}</td>
                  <td>{el.passport.surname}</td>
                  <td>{el.position.positionName}</td>
                  <td className={styles['expanded']}>
                    {el.organization.organizationName}
                  </td>
                  <td>
                    <Button
                      className={styles['button-info']}
                      onClick={() => setPassport(el.passport)}
                    >
                      Переглянути паспортні дані
                    </Button>
                  </td>
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
