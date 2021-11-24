/* eslint-disable */
import * as React from 'react';
import { Button, List } from 'src/components/common/common';
import styles from './styles.module.scss';

const Extract = ({ extract, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <List className={styles.list} divided relaxed>
          <div className={styles.item}>
            <List.Content>
              <List.Header as="a">{`Парметри пашуку: ${extract.params}`}</List.Header>
            </List.Content>
          </div>
          <div className={styles.item}>
            <List.Content>
              <List.Header as="a">{`Дата витрачання: ${extract.issueDate}`}</List.Header>
            </List.Content>
          </div>
          <div className={styles.item}>
            <List.Content>
              <List.Header as="a">{`Проплачено: ${
                extract.isPaid ? 'Проплачено' : 'Не проплачено'
              }`}</List.Header>
            </List.Content>
          </div>
          <div className={styles.item}>
            <List.Content>
              <List.Header as="a">{`Дані реєстратора: ${extract.user.passport.name} ${extract.user.passport.surname}`}</List.Header>
            </List.Content>
          </div>
          <div className={styles.item}>
            <List.Content>
              <List.Header as="a">{`Чи є дані: ${
                extract.isEmpty ? 'Ні' : 'Так'
              }`}</List.Header>
            </List.Content>
          </div>
          {!extract.isEmpty && (
            <>
              <div className={styles.item}>
                <List.Content>
                  <List.Header as="a">{`Серія: ${extract.blank.series}`}</List.Header>
                </List.Content>
              </div>
              <div className={styles.item}>
                <List.Content>
                  <List.Header as="a">{`Код: ${extract.blank.code.code}`}</List.Header>
                </List.Content>
              </div>
              <div className={styles.item}>
                <List.Content>
                  <List.Header as="a">{`Назва: ${extract.blank.code.name}`}</List.Header>
                </List.Content>
              </div>
            </>
          )}
        </List>
        <Button onClick={onClose}>Вихід</Button>
      </div>
    </div>
  );
};

export default Extract;
