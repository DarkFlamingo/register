/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'src/components/common/common';
import { log } from 'src/services/services';
import './styles.scss';

const LogsModal = ({ onClose }) => {
  const [logs, setLogs] = React.useState([]);
  const [filter, setFilter] = React.useState({
    name: '',
    surname: '',
    series: '',
    number: null,
    code: null,
    codeName: ''
  });

  React.useEffect(async () => {
    const updatedLogs = await log.getAllLogs();
    setLogs(updatedLogs);
  }, []);

  React.useEffect(async () => {
    const updatedLogs = await log.getAllLogs();

    const filteredArray = updatedLogs.filter(log => {
      const nameFiltered = filter.name
        ? log.user.passport.name.includes(filter.name)
        : true;

      const surnameFiltered = filter.surname
        ? log.user.passport.surname.includes(filter.surname)
        : true;

      const seriesFiltered = filter.series
        ? log.blank.series.includes(filter.series)
        : true;

      const codeNameFiltered = !filter.codeName
        ? true
        : log.blank.code
        ? log.blank.code.name.includes(filter.codeName)
        : false;

      const numberFiltered = filter.number
        ? log.blank.number.toString().includes(filter.number)
        : true;

      const codeFiltered = !filter.code
        ? true
        : log.blank.code
        ? log.blank.code.code.toString().includes(filter.code)
        : false;

      return (
        nameFiltered &&
        surnameFiltered &&
        seriesFiltered &&
        codeNameFiltered &&
        numberFiltered &&
        codeFiltered
      );
    });
    setLogs(filteredArray);
  }, [filter]);

  const changeFilter = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  return (
    <div className={'modal-custom-logs'}>
      <div className={'modal-content'}>
        <table div className={'extract-table'}>
          <tr>
            <th>Тип дії</th>
            <th>Дата</th>
            <th>Імя реєстратора</th>
            <th>Призвіще</th>
            <th>Серія бланку</th>
            <th>Номер бланку</th>
            <th>Код витрачання</th>
            <th>Причина витрачання</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
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
                placeholder="Серія"
                onChange={ev => changeFilter('series', ev.target.value)}
                value={filter.series}
              />
            </th>
            <th>
              <Form.Input
                fluid
                type="number"
                placeholder="Номер"
                onChange={ev => changeFilter('number', ev.target.value)}
                value={filter.number}
              />
            </th>
            <th>
              <Form.Input
                fluid
                type="number"
                placeholder="Код"
                onChange={ev => changeFilter('code', ev.target.value)}
                value={filter.code}
              />
            </th>
            <th>
              <Form.Input
                fluid
                placeholder="Причина"
                onChange={ev => changeFilter('codeName', ev.target.value)}
                value={filter.codeName}
              />
            </th>
          </tr>
          {logs &&
            logs.map(el => (
              <tr key={el.id}>
                <td>{el.actionType}</td>
                <td>{el.date}</td>
                <td>{el.user.passport.name}</td>
                <td>{el.user.passport.surname}</td>
                <td>{el.blank.series}</td>
                <td>{el.blank.number}</td>
                {el.blank.code && (
                  <>
                    <td>{el.blank.code.code}</td>
                    <td>
                      {el.blank.code.name.length > 30
                        ? `${el.blank.code.name.slice(0, 30)}...`
                        : el.blank.code.name}
                    </td>
                  </>
                )}
                {!el.blank.code && (
                  <>
                    <td>Не витрачений</td>
                  </>
                )}
              </tr>
            ))}
        </table>
        <Button onClick={onClose}>Вихід</Button>
      </div>
    </div>
  );
};

LogsModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default LogsModal;
