/* eslint-disable */
import * as React from 'react';
import moment from 'moment';
import { blankType } from 'src/common/prop-types/prop-types';
import './styles.scss';

const BlankItem = ({ blank }) => (
  <div className={'blank-item'}>
    <table>
      <tr>
        <th>Серія</th>
        <th>Номер</th>
        {blank.code ? (
          <>
            <th>Код витрачання</th>
            <th>Причина витрачання</th>
            <th>Дата витрачання</th>
          </>
        ) : (
          <th>Статус витрачання</th>
        )}
      </tr>
      <tr>
        <td>{blank.series}</td>
        <td>{blank.number}</td>
        {blank.code ? (
          <>
            <td>{blank.code.code}</td>
            <td>{blank.code.name}</td>
            <td>{blank.issueDate}</td>
          </>
        ) : (
          <td>Бланк не витрачений</td>
        )}
      </tr>
    </table>
  </div>
);

BlankItem.propTypes = {
  blank: blankType.isRequired
};

export default BlankItem;
