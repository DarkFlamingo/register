/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/common/common';
import './styles.scss';

const LogsModal = ({ onClose }) => {
  const { logs } = useSelector(state => ({
    logs: state.log.logs
  }));

  return (
    <div className={'modal-custom'}>
      <div className={'modal-content'}>
        <table div className={'extract-table'}>
          <tr>
            <th>Тип дії</th>
            <th>Дата</th>
            <th>Імя реєстратора</th>
            <th>Призвіще</th>
            <th>Серія бланку</th>
            <th>Код витрачання</th>
            <th>Причина витрачання</th>
          </tr>
          {logs.map(el => (
            <tr key={el.id}>
              <td>{el.actionType}</td>
              <td>{el.date}</td>
              <td>{el.user.passport.name}</td>
              <td>{el.user.passport.surname}</td>
              <td>{el.blank.series}</td>
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
