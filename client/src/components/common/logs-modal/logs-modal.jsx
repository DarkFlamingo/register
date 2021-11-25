import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, List } from 'src/components/common/common';
import styles from './styles.module.scss';

const LogsModal = ({ onClose }) => {
  const { logs } = useSelector(state => ({
    logs: state.log.logs
  }));

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <List className={styles.list} divided relaxed>
          <div className={styles.item}>
            <List.Content>
              <List.Header>
                <div className={styles['logs-wrapper']}>
                  <div className={styles.log}>Тип дії</div>
                  <div className={styles.log}>Дата</div>
                  <div className={styles.log}>Імя реєстратора</div>
                  <div className={styles.log}>Призвіще</div>
                  <div className={styles.log}>Серія бланку</div>
                  <div className={styles.log}>Код витрачання</div>
                  <div className={styles.log}>Причина витрачання</div>
                </div>
              </List.Header>
            </List.Content>
          </div>
          {logs.map(el => (
            <div key={el.id} className={styles.item}>
              <List.Content>
                <List.Header>
                  <div className={styles['logs-wrapper']}>
                    <div className={styles.log}>{el.actionType}</div>
                    <div className={styles.log}>{el.date}</div>
                    <div className={styles.log}>{el.user.passport.name}</div>
                    <div className={styles.log}>{el.user.passport.surname}</div>
                    <div className={styles.log}>{el.blank.series}</div>
                    {el.blank.code && (
                      <>
                        <div className={styles.log}>{el.blank.code.code}</div>
                        <div className={styles.log}>{el.blank.code.name}</div>
                      </>
                    )}
                    {!el.blank.code && (
                      <>
                        <div className={styles.log}>Не витрачений</div>
                      </>
                    )}
                  </div>
                </List.Header>
              </List.Content>
            </div>
          ))}
        </List>
        <Button onClick={onClose}>Вихід</Button>
      </div>
    </div>
  );
};

LogsModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default LogsModal;
