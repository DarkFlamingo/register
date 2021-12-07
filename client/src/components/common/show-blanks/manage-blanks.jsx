/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Form } from 'src/components/common/common';
import { blank as blankService } from 'src/services/services';
import UpdateBlankModal from '../update-blank-modal/update-blank-modal';
import SetBlankIssueCode from '../set-issue-code/set-issue-code';
import styles from './styles.module.scss';

const ShowBlanks = ({ onClose, isUpdateFully }) => {
  const [blank, setBlank] = React.useState(null);

  const [blanks, setBlanks] = React.useState([]);
  const [filter, setFilter] = React.useState({
    series: '',
    number: '',
    code: '',
    codeName: ''
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

      const codeFiltered = !filter.code
        ? true
        : blank.code
        ? blank.code.code.toString().includes(filter.code)
        : false;

      const codeNameFiltered = !filter.codeName
        ? true
        : blank.code
        ? blank.code.name.includes(filter.codeName)
        : false;

      return (
        seriesFiltered && numberFiltered && codeFiltered && codeNameFiltered
      );
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
    <div className={styles['modal-custom-blanks']}>
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
                  <tbody>
                    <tr>
                      <th>Серія</th>
                      <th>Номер</th>
                      <th>Код витрачання</th>
                      <th>Причина витрачання</th>
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
                          type="number"
                          placeholder="Номер"
                          onChange={ev =>
                            changeFilter('number', ev.target.value)
                          }
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
                          onChange={ev =>
                            changeFilter('codeName', ev.target.value)
                          }
                          value={filter.codeName}
                        />
                      </th>
                    </tr>
                    {blanks && blanks.length > 0 ? (
                      blanks.map(el => (
                        <tr key={el.id}>
                          <td>{el.series}</td>
                          <td>{el.number}</td>
                          {el.code ? (
                            <>
                              <td>{el.code.code}</td>
                              <td>{el.code.name}</td>
                            </>
                          ) : (
                            <td>Бланк не витрачений</td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr className={styles['no-blanks']}>
                        <td></td>
                        <td>Даних немає</td>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
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

ShowBlanks.propTypes = {
  onClose: PropTypes.func.isRequired,
  isUpdateFully: PropTypes.bool.isRequired
};

export default ShowBlanks;
