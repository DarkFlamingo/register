/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Form } from 'src/components/common/common';
import { blank as blankService } from 'src/services/services';
import UpdateBlankModal from '../update-blank-modal/update-blank-modal';
import SetBlankIssueCode from '../set-issue-code/set-issue-code';
import styles from './styles.module.scss';

const ManageBlanksIssue = ({ onClose }) => {
  const [blank, setBlank] = React.useState(null);

  const [blanks, setBlanks] = React.useState([]);
  const [filter, setFilter] = React.useState({
    series: '',
    number: '',
    isIssueShow: true
  });

  const changeFilter = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const getFilteredArray = blanksArray => {
    return blanksArray.filter(blank => {
      const seriesFiltered = filter.series
        ? blank.series.includes(filter.series)
        : true;

      const numberFiltered = filter.number
        ? blank.number.toString().includes(filter.number)
        : true;

      const issueFiltered = filter.isIssueShow
        ? true
        : blank.code
        ? false
        : true;

      return seriesFiltered && numberFiltered && issueFiltered;
    });
  };

  const handleUpdateBlank = async data => {
    await blankService.updateById(data);
    const uploadBlanks = await blankService.getAllBlanks();
    const filteredBlanks = getFilteredArray(uploadBlanks);
    setBlanks(filteredBlanks);
  };

  React.useEffect(async () => {
    const uploadBlanks = await blankService.getAllBlanks();
    setBlanks(uploadBlanks);
  }, []);

  React.useEffect(async () => {
    const uploadBlanks = await blankService.getAllBlanks();
    const filteredBlanks = getFilteredArray(uploadBlanks);
    setBlanks(filteredBlanks);
  }, [filter]);

  return (
    <div className={styles['modal-custom-blanks-issue']}>
      <div className={styles['modal-content']}>
        <List className={styles.list} divided relaxed>
          <div className={styles['list-blanks']}>
            <div>
              {blank ? (
                <SetBlankIssueCode
                  setOpen={setBlank}
                  updateBlank={handleUpdateBlank}
                  blank={blank}
                />
              ) : (
                <table>
                  <tbody>
                    <tr>
                      <th>Серія</th>
                      <th>Номер</th>
                      <th>Дія</th>
                    </tr>
                    <tr>
                      <th>
                        <Form.Input
                          fluid
                          placeholder="Серія"
                          onChange={ev =>
                            changeFilter('series', ev.target.value)
                          }
                          value={filter.series}
                        />
                      </th>
                      <th>
                        <Form.Input
                          fluid
                          placeholder="Номер"
                          onChange={ev =>
                            changeFilter('number', ev.target.value)
                          }
                          value={filter.number}
                        />
                      </th>
                      <th>
                        {filter.isIssueShow ? (
                          <Button
                            onClick={() => changeFilter('isIssueShow', false)}
                          >
                            Приховати витрачені
                          </Button>
                        ) : (
                          <Button
                            onClick={() => changeFilter('isIssueShow', true)}
                          >
                            Показати витрачені
                          </Button>
                        )}
                      </th>
                    </tr>
                    {blanks.map(el => (
                      <tr key={el.id}>
                        <td>{el.series}</td>
                        <td>{el.number}</td>
                        <td>
                          {el.code ? (
                            'Бланк уже витрачений'
                          ) : (
                            <Button
                              className={styles['button-edit']}
                              onClick={() => setBlank(el)}
                            >
                              Внести дані про витрачання
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </List>
        {!blank && <Button onClick={onClose}>Вихід</Button>}
      </div>
    </div>
  );
};

ManageBlanksIssue.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ManageBlanksIssue;
