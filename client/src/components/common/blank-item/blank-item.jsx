/* eslint-disable */
import * as React from 'react';
import moment from 'moment';
import { blankType } from 'src/common/prop-types/prop-types';

const BlankItem = ({ blank }) => (
  // <List.Item>
  //   <List.Content>
  //     <List.Header>{`Серія: ${blank.series}`}</List.Header>
  //     <List.Description>{`Номер: ${blank.number}`}</List.Description>
  //     {blank.code ? (
  //       <>
  //         <List.Description>{`Код: ${blank.code.code}`}</List.Description>
  //         <List.Description>{`Номер: ${blank.code.name}`}</List.Description>
  //       </>
  //     ) : (
  //       <List.Description>{`Бланк не витрачений`}</List.Description>
  //     )}
  //     <List.Description>{`Дата створення: ${moment(blank.issueDate).format(
  //       'DD / MM / YY, h:mm:ss'
  //     )}`}</List.Description>
  //   </List.Content>
  // </List.Item>
  <table>
    <tr>
      <th>Серія</th>
      <th>Номер</th>
      <th>Код</th>
      <th>Причина</th>
      <th>Дата витрачання</th>
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
);

BlankItem.propTypes = {
  blank: blankType.isRequired
};

export default BlankItem;
