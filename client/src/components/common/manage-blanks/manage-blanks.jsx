/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, List } from 'src/components/common/common';
import { blank as blankService } from 'src/services/services';
import UpdateBlankModal from '../update-blank-modal/update-blank-modal';
import styles from './styles.module.scss';
import { useAction } from 'src/hooks/useAction';

const ManageBlanks = ({ onClose }) => {
  const [blank, setBlank] = React.useState(null);

  const { blanks } = useSelector(state => ({
    blanks: state.blank.blanks
  }));

  const { loadAllBlanks } = useAction();

  const handleUpdateBlank = async data => {
    await blankService.updateById(data);
    loadAllBlanks();
  };

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <List className={styles.list} divided relaxed>
          <div className={styles['list-blanks']}>
            <div>
              {blank ? (
                <UpdateBlankModal
                  setOpen={setBlank}
                  updateBlank={handleUpdateBlank}
                  blank={blank}
                />
              ) : (
                <table>
                  <tr>
                    <th>Серія</th>
                    <th>Номер</th>
                    <th>Дія</th>
                  </tr>
                  {blanks.map(el => (
                    <tr>
                      <td>{el.series}</td>
                      <td>{el.number}</td>
                      <td>
                        <Button
                          className={styles['button-edit']}
                          onClick={() => setBlank(el)}
                        >
                          Редагувати
                        </Button>
                      </td>
                    </tr>
                  ))}
                </table>
              )}
            </div>
          </div>
        </List>
        <Button onClick={onClose}>Вихід</Button>
      </div>
    </div>
  );
};

ManageBlanks.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ManageBlanks;
